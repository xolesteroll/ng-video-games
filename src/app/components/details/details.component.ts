import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from 'src/app/models';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from './../../services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  public gameRating = 0
  public gameId!: string
  public game!: Game
  private routeSub!: Subscription
  private gameSub!: Subscription
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
    ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['gameId']
      this.getGameDetails(this.gameId)
    })
  }

  public getColor(value: number): string {
    if (value > 75) {
      return '#5ee432'
    } else if (value > 50) {
      return '#fffa50'
    } else if (value > 30) {
      return '#f7aa38'
    } else {
      return '#ef4655'
    }
  }

  private getGameDetails(gameId: string): void {
    this.gameSub = this.httpService.getGameDetails(gameId)
    .subscribe((gameResp: Game) => {
      this.game = gameResp
      console.log(this.game)
      setTimeout(() => {
        this.gameRating = this.game.metacritic
      }, 1000)
    })
  }

  ngOnDestroy():void {
    if (this.gameSub) {
      this.gameSub.unsubscribe
    }
    if (this.routeSub) {
      this.gameSub.unsubscribe
    }
  }

}
