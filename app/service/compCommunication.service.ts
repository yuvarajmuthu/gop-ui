import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
 import { Observable } from 'rxjs';

@Injectable()
export class MissionService {
 
  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();
  private missionAlertSource = new Subject<string>();

  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();
  public missionAlert$ = this.missionAlertSource.asObservable();

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
/*  confirmMission(astronaut: string) {
    this.missionConfirmedSource.next(astronaut);
  }*/
}
