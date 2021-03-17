import type {ComponentType} from './component';
import type {Dispatcher} from './dispatcher';
import type {Entity} from './entity';
import {MainQuery, MainQueryBuilder} from './query';


export interface SystemType {
  new(): System;
}


export abstract class System {
  __readMask: number[] = [];
  __writeMask: number[] = [];
  __dispatcher: Dispatcher;
  private __queryBuilders: MainQueryBuilder[] | null = [];

  get name(): string {return this.constructor.name;}

  query(buildCallback: (q: MainQueryBuilder) => void): MainQuery {
    const query = new MainQuery(this);
    const builder = new MainQueryBuilder(buildCallback, query, this);
    if (this.__queryBuilders) {
      this.__queryBuilders.push(builder);
    } else {
      builder.__build();
    }
    return query;
  }

  createEntity(...initialComponents: (ComponentType<any> | any)[]): Entity {
    return this.__dispatcher.createEntity(initialComponents, this);
  }

  execute(time: number, delta: number): void {
    // do nothing by default
  }

  __init(dispatcher: Dispatcher): void {
    if (dispatcher === this.__dispatcher) return;
    if (this.__dispatcher) {
      throw new Error(`You can't reuse an instance of system ${this.name} in different worlds`);
    }
    this.__dispatcher = dispatcher;
    for (const builder of this.__queryBuilders!) builder.__build();
    this.__queryBuilders = null;
  }
}
