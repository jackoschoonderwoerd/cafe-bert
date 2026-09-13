

interface MenuItem {
    nl: string;
    en: string;
    link: string
}

export interface NavigationSlice {
    readonly userMenuItems: MenuItem[];
    readonly adminMenuItems: MenuItem[];

}

// export type PersistedAppStoreSlice = Pick<AppStoreSlice, 'drinkCategories'>

export const initialNavigationSlice: NavigationSlice = {
    userMenuItems: [
        {
            nl: 'welkom',
            en: 'welcome',
            link: 'welcome'
        },
        {
            nl: 'dranken',
            en: 'drinks',
            link: 'drinks'
        },
        {
            nl: 'menu',
            en: 'menu',
            link: 'menu'
        },
        {
            nl: 'locatie',
            en: 'location',
            link: 'location'
        },
        {
            nl: 'jenever',
            en: 'dutch gin',
            link: 'dutch-gin'
        },

    ],
    adminMenuItems: []
}
