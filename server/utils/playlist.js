import {} from '../modules/application/documents/Playlist'

class Playlist {
    static count = 0;

    constructor(title, owner) {
        this.title = title;
        this.owner = owner;
        this.id = Playlist.count;
        this.songs = [];
        Playlist.count++;
    }

    savePlaylist() {
        var pl = new Playlist
    }
}

export default Playlist;