import { Injectable, ViewContainerRef, EmbeddedViewRef, ViewRef } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs';

import {TemplatePopulationComponent} from './../constitution.template.component';
@Injectable()
export class MissionService {
 
  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<ViewRef>();
  private missionAlertSource = new Subject<string>();
  private newProfileTemplateAddedPopulation = new Subject<TemplatePopulationComponent>();

  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionProfileTemplateRemoved$ = this.missionConfirmedSource.asObservable();
  public missionAlert$ = this.missionAlertSource.asObservable();
  missionNewProfileTemplateAdded$ = this.newProfileTemplateAddedPopulation.asObservable();

  // Service message commands
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }

  public announceAlertMission(mission: string) {
    this.missionAlertSource.next(mission);
    console.log('alerted');
  }
 
  getAlert(): Observable<any> {
    return this.missionAlertSource.asObservable();
  }

//for group profile template - TemplatePopulationComponent
  newProfileTemplateAddedMission(populationComponent: TemplatePopulationComponent) {
    this.newProfileTemplateAddedPopulation.next(populationComponent);
  }

  removeProfileTemplateMission(viewRef: ViewRef) {
    this.missionConfirmedSource.next(viewRef);
  }
}
