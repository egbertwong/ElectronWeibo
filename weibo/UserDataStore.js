const Store = require('electron-store')
const uuidv4 = require('uuid/v4')
const path = require('path')

class UserDataStore extends Store {
    constructor(settings) {
        super(settings)
        this.tracks = this.get('tracks') || []
        this.users = this.get('users') || []
    }

    saveUsers() {
        this.set('users', this.users)
        return this
    }

    getUsers() {
        return this.get('users') || []
    }

    addUser(user) {
        const tracksWithProps = user.map(user => {
            return {
                id: uuidv4(),
                uid: user
            }
        }).filter(user => {
            const currentUserUID = this.getUsers().map(user => user.uid)
            return currentTracksPath.indexOf(track.path) < 0
        })
        this.tracks = [ ...this.tracks, ...tracksWithProps ]
        return this.saveUsers()
    }

    saveTracks() {
        this.set('tracks', this.tracks)
        return this
    }
    getTracks() {
        return this.get('tracks') || []
    }
    addTracks(tracks) {
        const tracksWithProps = tracks.map(track => {
            return {
                id: uuidv4(),
                path: track,
                fileName: path.basename(track)
            }
        }).filter(track => {
            const currentTracksPath = this.getTracks().map(track => track.path)
            return currentTracksPath.indexOf(track.path) < 0
        })
        this.tracks = [ ...this.tracks, ...tracksWithProps ]
        return this.saveTracks()
    }
    deleteTrack(deletedId) {
        this.tracks = this.tracks.filter(item => item.id !== deletedId)
        return this.saveTracks()
    }
}

module.exports = UserDataStore