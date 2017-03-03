import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    message;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private AuthService: AuthService) { }

    ngOnInit() {
        // reset login status
        this.AuthService.logout();
    }

    login() {
        this.loading = true;
        this.AuthService.login(this.model.id, this.model.password)
            .subscribe(
            data => {
                if(data.auth === '관리자') {
                    this.router.navigate(['/dashboard']);
                }
                if(data.auth === '가맹') {
                    this.router.navigate(['/store', data.storeId]);
                }
            },
            error => {
                this.message = JSON.parse(error._body);
                console.log(this.message.message);
                this.loading = false;
            });
    }
}