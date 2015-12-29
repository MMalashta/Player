class Song {
    static count = 0;

    constructor(artist, title) {
        this.title = title;
        this.artist = artist;
        this.id = Song.count;
        Song.count++;
        this.url = "/songs/" + this.artist + "/" + this.title + ".mp3";
    }
}

export default Song;