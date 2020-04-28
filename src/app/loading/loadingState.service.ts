import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingStateService {
    public $loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public loading() {
        this.$loading.next(true);
    }

    public finished() {
        this.$loading.next(false);
    }
}