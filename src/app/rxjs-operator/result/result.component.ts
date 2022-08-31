import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { operatorMap } from 'src/app/constants/operators.constants';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @Input() operator!: string;
  #subscription!: Subscription;
  result$!: Observable<any>;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['operator']) {
      if (this.#subscription) {
        this.#subscription.unsubscribe();
      }
      console.clear();
      const callback = operatorMap.get(this.operator);
      if (callback) {
        this.result$ = callback();
        this.#subscription = this.result$.subscribe({
          next: (value: any) => console.log('value emitted', value),
          complete: () => console.log('completed'),
          error: (err: any) => console.log(err),
        });
      }
    }
  }

  ngOnInit(): void {}
}
