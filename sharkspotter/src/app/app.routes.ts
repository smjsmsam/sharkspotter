import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
    },
    {
        path: 'account',
        loadComponent: () => import('./pages/account/account.page').then( m => m.AccountPage)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
    },
    {
        path: 'forum',
        loadComponent: () => import('./pages/forum/forum.page').then( m => m.ForumPage)
    },
    {
        path: 'maptest',
        loadComponent: () => import('./pages/maptest/maptest.page').then( m => m.MaptestPage)
    },
];
