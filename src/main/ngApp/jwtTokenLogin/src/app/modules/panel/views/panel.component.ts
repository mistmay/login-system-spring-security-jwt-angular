import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { User } from "src/app/model/user";
import { LoginService } from "src/app/services/login.service";
import { ApiService } from "src/app/api/api.service";

@Component({
    selector: 'app-panel',
    template: `
    <section class="p-5 d-flex flex-column align-items-center gap-3" *ngIf="currentUser">
        <div class="container p-5 bg-white rounded border border-secondary d-flex flex-column gap-3">
            <p>Benvenuto {{currentUser.username}}</p>
            <button type="button" class="btn btn-danger" (click)="logout()">Logout</button>
        </div>
        <div class="container p-5 bg-white rounded border border-secondary d-flex flex-column align-items-center gap-2" *ngIf="userList">
            <h1 class="fw-bold text-center">User List:</h1>
            <ng-container *ngIf="userList.length > 0; else noUser">
                <p *ngFor="let user of userList" class="text-center">
                    {{user.username}} {{user.email}}
                </p>
            </ng-container>
        </div>
    </section>
    <ng-template #noUser>
        <p class="text-center">No users</p>
    </ng-template>
    `,
    styles: [`
    `]
})
export class PanelComponent implements OnInit, OnDestroy {
    currentUser: User | undefined;
    subscriptions: Subscription[] = [];
    userList!: User[];

    constructor(private loginService: LoginService, private api: ApiService) { }

    ngOnInit(): void {
        this.subscriptions.push(this.loginService.getCurrentUser()
            .subscribe((res: User | undefined) => {
                this.currentUser = res;
            }));
        this.subscriptions.push(this.api.getAllUsers()
            .subscribe((res: User[]) => {
                this.userList = res;
            }));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

    logout(): void {
        this.loginService.logOut();
    }
}