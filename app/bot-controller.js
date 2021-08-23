const { Webhook, MessageBuilder } = require('discord-webhook-node');
const WebHook_URl = process.env.WEBHOOK_URL;
const hook = new Webhook(`${WebHook_URl}`);

let sendMessage = async(message) => {
    try {
        const embed = new MessageBuilder()
        .setTitle(`${message.title}`)
        .setURL(`https://animet.tv/video/${fixedEncodeURIComponent(message.title)}`)
        .setAuthor("New Episode", "https://raw.githubusercontent.com/animet-tv/animet-tv-assets/main/new_release_icon.png","https://raw.githubusercontent.com/animet-tv/animet-tv-assets/main/new_release_icon.png")
        .setColor(`#e0255d`)
        .setDescription(`Episode: ${message.episodeNumber}`)
        .setThumbnail(`${message.img_url}`);

        hook.send(embed);
    } catch (error) {
        console.log(error);
    }
}

let sendMessageReleaseAlert = async() => {
    try {
        
        const embed = new MessageBuilder()
        .setTitle("Daily release ALERT")
        .setURL("https://animet.tv/browse")
        .setAuthor("GOODIES DETECTED", "https://raw.githubusercontent.com/animet-tv/animet-tv-assets/main/new_release_icon.png","https://raw.githubusercontent.com/animet-tv/animet-tv-assets/main/new_release_icon.png")
        .setColor(`#FECC01`)
        .setDescription("All the titles have been indexed by AnimetTV ")
        .setThumbnail("https://raw.githubusercontent.com/animet-tv/animet-tv-assets/main/new_release_icon.png")
        .setTimestamp();
        hook.send(embed);
    } catch (error) {
        console.log(error);
    }
}

function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }

module.exports = {
    sendMessage,
    sendMessageReleaseAlert
}