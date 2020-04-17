export class NewComment {
    public content: string | null = null;

    constructor(public name: string) { }

    setComment(comment: string) {
        this.content = comment;
    }

    test() {
        console.log(this.name);
    }
}