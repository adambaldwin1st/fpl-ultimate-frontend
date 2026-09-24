// Maps a club's 3-letter short name (as returned by the API's `club`/`opponent`
// fields, sourced from bootstrap-static) to the numeric team code Premier League's
// asset CDN uses for crest images. Stable for a season; source of truth is
// bootstrap-static's `teams[].code` (https://draft.premierleague.com/api/bootstrap-static).
const CLUB_BADGE_CODES: Record<string, number> = {
    ARS: 3,
    AVL: 7,
    BOU: 91,
    BRE: 94,
    BHA: 36,
    CHE: 8,
    COV: 9,
    CRY: 31,
    EVE: 11,
    FUL: 54,
    HUL: 88,
    IPS: 40,
    LEE: 2,
    LIV: 14,
    MCI: 43,
    MUN: 1,
    NEW: 4,
    NFO: 17,
    TOT: 6,
    SUN: 56,
};

export function getClubCrestUrl(clubShortName: string): string | null {
    const code = CLUB_BADGE_CODES[clubShortName];
    return code ? `https://resources.premierleague.com/premierleague25/badges/${code}.svg` : null;
}
