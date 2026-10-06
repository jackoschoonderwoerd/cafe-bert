import { inject } from '@angular/core';
import {
    patchState,
    signalStore,
    withMethods,
    withState
} from '@ngrx/signals';

import {
    doc,
    Firestore,
    onSnapshot,
    setDoc
} from '@angular/fire/firestore';
import { NewsItem } from '../../models/news-item.model';

// import { NewsItem } from '../models/news.model';

const initialState: NewsItem = {
    contentNl: '',
    contentEn: '',
    visible: false
};

export const NewsStore = signalStore(
    { providedIn: 'root' },

    withState(initialState),

    withMethods((
        store,
        firestore = inject(Firestore)
    ) => ({

        loadNews() {

            const newsRef = doc(
                firestore,
                'settings',
                'news'
            );

            return onSnapshot(
                newsRef,
                snapshot => {

                    if (!snapshot.exists()) {
                        return;
                    }

                    const data = snapshot.data();

                    patchState(store, {
                        contentNl: data['contentNl'] ?? '',
                        contentEn: data['contentEn'] ?? '',
                        visible: data['visible'] ?? false
                    });
                }
            );
        },

        async saveNews(news: NewsItem) {

            const newsRef = doc(
                firestore,
                'settings',
                'news'
            );

            await setDoc(
                newsRef,
                news
            );
        }
    }))
);
