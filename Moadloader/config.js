module.exports = {
    client: {
        token: 'MTIwMDIwNjQ4OTI2MDkzMzIzMg.GaU96P.PAvCbPK3GonJz0Yuz0wDsct82mcE9uH3fKJ8pA', // ← Your bot token (.env IS RECOMMENDED)
        id: '1200206489260933232' // ← Your bot ID
    },
    modmail: {
        guildId: '1145935264171180144', // ← Your server ID
        categoryId: '1212084660042211459', // ← The modmail category ID
        staffRoles: ['1187856441973952603'], // ← The modmail staff roles IDs
        mentionStaffRolesOnNewMail: true // ← Mention staff roles when there is a new mail?
    },
    logs: {
        webhookURL: '' // ← The logging webhook URL (OPTIONAL) (.env IS RECOMMENDED)
    }
};