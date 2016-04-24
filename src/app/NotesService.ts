/// <reference path="../../node_modules/rxjs/Rx.d.ts" />

import {Injectable, NgZone} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import 'pouchdb';

@Injectable()
export class NotesService {
    db : any;
    notesstream : Observable<any>;

    constructor (private _ngZone : NgZone) {
       //this.db = new PouchDB('http://127.0.0.1:5984/githubnotes');

        this.db = new PouchDB('githubnotes');

        this.db.replicate.from('http://127.0.0.1:5984/githubnotes', {live: true, retry: true});
        this.db.replicate.to('http://127.0.0.1:5984/githubnotes', {live: true, retry: true});

        var ddoc = {
            _id: '_design/notes',
            views: {
                notes: {
                    map: function(doc) {
                        if (doc.type === 'note') {
                            emit([doc.username, doc.date], doc );
                        }
                    }.toString()
                }
            }
        };

        this.db.put(ddoc).catch(err => {});

        const _changesStream = this.db.changes({live: true, include_docs: true, since: 'now'});

        this.notesstream = Observable.create(observer => {
            _changesStream.on('change', (change) => { this._ngZone.run ( () => observer.next(change) ); });
            _changesStream.on('complete', (info) => { this._ngZone.run ( () => observer.complete()); });
            _changesStream.on('error', (error) => { this._ngZone.run ( () => observer.error(error)); });
        }).share();
    }

    addNoteForUser (username : string, note : string) : void {
        this.db.post({
            username : username,
            date: new Date(),
            note : note,
            type: 'note'
        });
    }

    getUserNotesstream ( username : string ) : Observable<any> {
        return this.notesstream
            .filter(change => {return change.doc.type === 'note' && change.doc.username === username})
            .map (change => { return change.doc });
    }

    getRemoveStream () : Observable<any> {
        return this.notesstream
            .filter(change => {return change.deleted})
            .map (change => { return change.id; });
    }

    getNotesforUser ( username : string ) : any {
        return this.db.query('notes/notes', { startkey : [username], endkey: [username, {}]})
            .then( (result) => { return result.rows.map (row => { return row.value; }); })
    }


    removeNote ( note : any ) : void {
        this.db.remove(note);
    }

    editNote ( note : any ) : void {
        this.db.put(note);
    }

}