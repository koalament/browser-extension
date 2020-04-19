import { Injectable } from '@angular/core';
import { connect } from 'socket.io-client';
import { environment } from "../environments/environment";
import { BehaviorSubject } from 'rxjs';



@Injectable()
export class AppResolverSocketService {
    private socket: any;
    private key = "https://koalament.io/";
    private event = btoa(this.key + "_" + environment.LAYER_VERSION);
    postList: any[] = [];
    $postList: BehaviorSubject<any[]> = new BehaviorSubject([]);

    constructor() {
        this.socket = connect(environment.SOCKET_ENDPOINT, { reconnection: false });
        this.socket.on(this.event, (comment) => {
            this.postList.unshift({
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
            this.postList = comments.results.reverse().map(x => {
                return {
                    comment: x.text,
                    name: x.nickname
                }
            });
            this.$postList.next(this.postList);
            // console.log(comments);
        });
    }
}