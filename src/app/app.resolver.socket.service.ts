import { Injectable } from '@angular/core';
import { connect } from 'socket.io-client';
import { environment } from "../environments/environment";
import { BehaviorSubject } from 'rxjs';
import * as chrome from './chrome.js';
import * as firefoxBrowser from './firefox.js';
import * as moment from 'moment';
import { firefox } from './browser';


@Injectable()
export class AppResolverSocketService {
    private socket: any;
    private key = "https://koalament.io/";
    private event = btoa(this.key + "_" + environment.LAYER_VERSION);
    postList: any[] = [];
    $postList: BehaviorSubject<any[]> = new BehaviorSubject([]);

    constructor() {

        if (!firefox(_ => {
            firefoxBrowser.tabs.selected.url().then(url => {
                this.key = url;
                this.event = btoa(this.key + "_" + environment.LAYER_VERSION);
                this.socket = connect(environment.SOCKET_ENDPOINT, { reconnection: false });
                this.resolveFromSocket();
            });
        })) {
            if (chrome.tabs.available()) {
                chrome.tabs.selected.url().then(url => {
                    // this.newComment.setUrl(url);
                    this.key = url;
                    this.event = btoa(this.key + "_" + environment.LAYER_VERSION);
                    this.socket = connect(environment.SOCKET_ENDPOINT, { reconnection: false });
                    this.resolveFromSocket();
                });
            } else {
                this.resolveFromSocket();
            }
        }
    }

    private resolveFromSocket() {
        this.socket = connect(environment.SOCKET_ENDPOINT, { reconnection: false });
        this.socket.on(this.event, (comment) => {
            this.postList.push({
                comment: comment.text,
                name: comment.nickname
            });
            this.$postList.next(this.postList);
        });
        this.socket.emit("read", {
            key: this.key,
            from: 0,
            limit: 100
        }, (err, comments) => {
            if (err) {
                console.error(err);
                return;
            }
            this.postList = comments.results.map(this.mapComment);
            // console.log(this.postList);
            // chrome.browserAction.setBadgeText("" + this.postList.length);
            this.$postList.next(this.postList);
        });
    }

    private mapComment(comment: any) {
        return {
            comment: comment.text,
            name: comment.nickname || 'Unknown',
            txid: comment._txid,
            created_at: comment.created_at,
            created_at_fromNow: moment(comment.created_at).fromNow()
        }
    }
}