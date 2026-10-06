import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'news',
        loadComponent: () => import('./features/news/news.component')
            .then(c => c.NewsComponent)
    },
    {
        path: 'quick-access-category/:categoryId',
        loadComponent: () => import('./features/quick-access-category/quick-access-category.component')
            .then(c => c.QuickAccessCategoryComponent)
    },
    {
        path: 'calendar',
        loadComponent: () => import('./features/calendar/calendar.component')
            .then(c => c.CalendarComponent)
    },
    {
        path: 'ajax',
        loadComponent: () => import('./features/ajax/ajax.component')
            .then(c => c.AjaxComponent)
    },
    {
        path: 'welcome',
        loadComponent: () => import('./features/welcome/welcome.component')
            .then(c => c.WelcomeComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home.component')
            .then(c => c.HomeComponent)
    },
    {
        path: 'drinks',
        loadComponent: () => import('./features/drinks/drinks.component')
            .then(c => c.DrinksComponent)
    },
    {
        path: 'foods',
        loadComponent: () => import('./features/food/foods.component')
            .then(c => c.FoodsComponent)
    },
    {
        path: 'location',
        loadComponent: () => import('./features/location/location.component')
            .then(c => c.LocationComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component')
            .then(c => c.LoginComponent)
    },
    {
        path: 'analytics',
        canActivate: [authGuard],
        loadComponent: () => import('./admin/analytics/analytics.component')
            .then(c => c.AnalyticsComponent)
    },
    {
        path: 'dutch-gin'
        , loadComponent: () => import('./features/dutch-gin/dutch-gin.component')
            .then(c => c.DutchGinComponent)
    },
    {
        path: '**',
        canActivate: [authGuard],
        loadComponent: () => import('./features/drinks/drinks.component')
            .then(c => c.DrinksComponent)
    },
];
