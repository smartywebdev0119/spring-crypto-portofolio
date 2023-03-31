import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { InputWalletsDataService } from 'src/app/shared/services/input-wallets-data.service';
import { environment } from 'src/environments/environment';
import { UserWallet } from '../model/user-wallet';
import { ErrorHandlerService } from './error-handler.service';

const apiGatewayURL = environment.apiGatewayURL;

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private dataSubject = new BehaviorSubject<UserWallet>({ name: '', symbol: '', total: { totalQuantity: 0, totalBalance: 0 }, balance: [] });
  private data$ = this.dataSubject.asObservable();
  
  public getEthereumWalletBalancesURL = apiGatewayURL + '/api/v1/wallet/eth/balance?wallets=';
  public getPolygonWalletBalancesURL = apiGatewayURL + '/api/v1/wallet/matic/balance?wallets=';
  public getAvalancheWalletBalancesURL = apiGatewayURL + '/api/v1/wallet/avax/balance?wallets=';
  
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private inputWalletsData: InputWalletsDataService
  ) { }

  
  getWalletsBalance(url: string): Observable<UserWallet> {
    const wallets = this.inputWalletsData.getDataFromSessionStorage();
    const data = this.http.get<UserWallet>(url + wallets).pipe(
      tap(data => {
        data.balance.forEach(wallet => {
          wallet.walletAddress = this.trimAddress(wallet.walletAddress);
        });
        this.dataSubject.next(data);
      }),
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
    return data;
  }

  trimAddress(address: string): string {
    return address.slice(0, 10);
  }

  getDataSource(): Observable<UserWallet> {
    return this.data$;
  }

}
