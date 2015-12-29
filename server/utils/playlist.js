class Playlist {
    static count = 0;

    constructor(title, owner) {
        this.title = title;
        this.owner = owner;
        this.id = Playlist.count;
        Playlist.count++;
    }
}

export default Playlist;