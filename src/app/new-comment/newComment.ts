export class NewComment {
    public content: string | null = null;
    public url: string = "https://koalament.io/";

    constructor(public name: string) { }

    setComment(comment: string) {
        this.content = comment;
    }

    setUrl(url:string) {
        this.url = url;
    }

    test() {
        console.log(this.name);
    }
}