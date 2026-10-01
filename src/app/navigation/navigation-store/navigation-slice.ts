

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
            nl: 'eten',
            en: 'food',
            link: 'foods'
        },
        {
            nl: 'dranken',
            en: 'drinks',
            link: 'drinks'
        },
        {
            nl: 'van wees',
            en: 'van wees',
            link: 'dutch-gin'
        },
        // {
        //     nl: 'ajax',
        //     en: 'ajax',
        //     link: 'ajax'
        // },
        {
            nl: 'agenda',
            en: 'calendar',
            link: 'calendar'
        },
        {
            nl: 'locatie',
            en: 'location',
            link: 'location'
        },

    ],
    adminMenuItems: []
}
