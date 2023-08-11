import Identicon from 'identicon.js';

export function generateIdenticon(ethereumAddress: string): string {
    const identicon = new Identicon(ethereumAddress, 128);
    identicon.background = [93, 36, 198, 255];
    const avatarData = `data:image/png;base64,${identicon.toString()}`;
    return avatarData;
}
