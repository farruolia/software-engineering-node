import User from "./User";

export default class Tuit {
    private id: string;
    tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null = null;

    constructor(id: string, tuit: string) {
          this.id = id;
          this.tuit = tuit;
    }
}
