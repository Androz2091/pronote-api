const request = require('../../request');
const { cipher } = require('../../cipher');

async function getId(session, username, fromCas)
{
    const { donnees: id } = await request(session, 'Identification', {
        donnees: {
            genreConnexion: 0,
            genreEspace: session.type.id,
            identifiant: username,
            pourENT: fromCas,
            enConnexionAuto: false,
            demandeConnexionAuto: false,
            demandeConnexionAppliMobile: false,
            demandeConnexionAppliMobileJeton: false,
            uuidAppliMobile: '',
            loginTokenSAV: ''
        }
    });

    return {
        scramble: id.alea,
        challenge: id.challenge
    };
}

async function getAuthKey(session, challenge, key, username)
{
    const { test } = await request(session, 'Authentification', {
        donnees: {
            connexion: 0,
            challenge: cipher(session, challenge, { key }),
            espace: session.type.id
        }
    });
    console.log('AUTH MESSAGE '+test, username);

    return null;
}

module.exports = {
    getId,
    getAuthKey
};
