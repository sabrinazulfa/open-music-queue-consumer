class Listener {
  constructor(playlistService, mailSender) {
    this._playlistService = playlistService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }
 
  async listen(message) {
    try {
        const { playlistId, targetEmail } = JSON.parse(message.content.toString());
    
        const playlist = await this._playlistService.getPlaylists(playlistId);

        const prettyJson = JSON.stringify(playlist, null, 2);

        const result = await this._mailSender.sendEmail(targetEmail, prettyJson);
        console.log('Email sent result:', result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;