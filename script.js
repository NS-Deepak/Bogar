const apiKey = 'thingspeak_api_key';
const channelID = 'thingspeak_channel_id';
const fieldID = 1; // Field ID for pH value

fetch(`https://api.thingspeak.com/channels/${channelID}/fields/${fieldID}.json?api_key=${apiKey}&results=1`)
	.then(response => response.json())
	.then(data => {
		const phValue = data.feeds[0].field1;
		document.getElementById('ph-value').innerText = `pH: ${phValue}`;
	})
	.catch(error => console.error('Error:', error));

setInterval(() => {
	fetch(`https://api.thingspeak.com/channels/${channelID}/fields/${fieldID}.json?api_key=${apiKey}&results=1`)
		.then(response => response.json())
		.then(data => {
			const phValue = data.feeds[0].field1;
			document.getElementById('ph-value').innerText = `pH: ${phValue}`;
		})
		.catch(error => console.error('Error:', error));
}, 15000); // Update every 15 seconds
if (phValue >= 6.5 && phValue <= 8.5) {
	document.getElementById('water-safety').innerHTML = 'Water is safe';
} else {
	document.getElementById('water-safety').innerHTML = 'Water is not safe';
}
