
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

import * as moment from 'moment';
import { FlightListService } from '../services/flight-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css'],
})
export class FlightListComponent implements OnInit {
  arr: number[] = Array.from(Array(5).keys());
  nameReadonly: boolean = false;
  totalFlightTime: number = 0.0;
  totalBlkTime: number = 0.0;

  filteredCustomerOptions!: Observable<any[]>;
  filteredRegistrationOptions!: Observable<any[]>;
  filteredCrewLegOptions!: Observable<any[]>;

  constructor(private _route: ActivatedRoute, 
    private _snackBar: MatSnackBar,
    private _flightListService: FlightListService) {}

  customers$: Observable<any> = this._route.data.pipe(
    map((x) => x.dropdowndata.data.customers)
  );
  crewLegs$: Observable<any> = this._route.data.pipe(
    map((x) => x.dropdowndata.data.crewLegs)
  );
  registrations$: Observable<any> = this._route.data.pipe(
    map((x) => x.dropdowndata.data.registrations)
  );
  staffs$: Observable<any> = this._route.data.pipe(
    map((x) => x.dropdowndata.data.staffs)
  );
  suppliers$: Observable<any> = this._route.data.pipe(
    map((x) => x.dropdowndata.data.suppliers)
  );

  pilots!: any[];
  attendants!: any[];
  officers!: any[];
  crews!: any[];

  filteredPilots!: Observable<any>;
  filteredOfficers!: Observable<any>;
  filteredAttendants!: Observable<any>;
  filteredCrew1!: Observable<any>;
  filteredCrew2!: Observable<any>;
  filteredCrew3!: Observable<any>;
  filteredCrew4!: Observable<any>;
  filteredCrew5!: Observable<any>;
  filteredCrew6!: Observable<any>;

  formGroup!: FormGroup;
  crewList: any[] = [];

  isNew: boolean = true;

  ngOnInit(): void {
    this.staffs$.subscribe((s) => {
      // this.pilots = s.filter((x: any) => x.tel1.toLowerCase() == 'pilot');
      // this.attendants = s.filter(
      //   (x: any) => x.tel1.toLowerCase() == 'flight attendant'
      // );
      // this.officers = s.filter(
      //   (x: any) =>
      //     !['pilot', 'flight attendant', ''].includes(x.tel1.toLowerCase())
      // );
      // this.crews = s.filter((x: any) => x.tel1 != '');

      this.pilots = [...s];
      this.attendants = [...s];
      this.officers = [...s];
      this.crews = [...s];

    });

    this.formGroup = new FormGroup({
      number: new FormControl('', Validators.required),
      date: new FormControl(new Date()),
      qno: new FormControl(''),
      customer: new FormControl('', Validators.required),
      registration: new FormControl('', Validators.required),
      // Pre Flight Tab
      preflightDone: new FormControl(false),
      cmdtAcceptance: new FormControl(false),
      nonCommercial: new FormControl(false),
      nextCheckDate: new FormControl(new Date()),
      deferDefect: new FormControl(false),
      //Delay Details
      hasDelay: new FormControl(false),
      delayBy: new FormControl(),
      delayAirport: new FormControl(),
      deOrCx: new FormControl(),
      delayTime: new FormControl(),
      delayReason: new FormControl(),
      delayCorrectiveAction: new FormControl(),
      // Oil Uplift
      engine1: new FormControl(),
      oilengine1: new FormControl(),
      propserial1: new FormControl(),
      engine2: new FormControl(),
      oilengine2: new FormControl(),
      propserial2: new FormControl(),
      record: new FormControl(),
      remarks: new FormControl(),
      totalFltTime: new FormControl(),
      totalBlkTime: new FormControl(),

      // Crew Details
      crew: new FormGroup({
        crewLeg: new FormControl('', Validators.required),
        cksOff: new FormControl(null, Validators.required),
        takeOff: new FormControl(null, Validators.required),
        landing: new FormControl(null, Validators.required),
        cksOn: new FormControl(null, Validators.required),
        fltTime: new FormControl(null, Validators.required),
        blkTime: new FormControl(null, Validators.required),
        paxNo: new FormControl(null, Validators.required),
        landingWeight: new FormControl(0),
        baggage: new FormControl(0),
        cargo: new FormControl(0),
        takeOffWeight: new FormControl(0),
        fuelUplift: new FormControl(0),
        fuelOnboard: new FormControl(0),
        crewFrom: new FormControl(),
        crewTo: new FormControl(),
        splitDutyFrom: new FormControl(),
        splitDutyTo: new FormControl(),
        flightNo: new FormControl(),
        rcptOrAdrNo: new FormControl(),
        supplier: new FormControl(),
        // Crew
        pilot: new FormControl(),
        officer: new FormControl(),
        attendant: new FormControl(),
        crew1: new FormControl(''),
        crew2: new FormControl(''),
        crew3: new FormControl(''),
        crew4: new FormControl(''),
        crew5: new FormControl(''),
        crew6: new FormControl(''),
      }),
    });

    this.configureAutoComplete_customer();
    this.configureAutoComplete_registration();
    this.configureAutoComplete_crewLeg();
    this.configureAutoComplete_pilot();
    this.configureAutoComplete_officer();
    this.configureAutoComplete_attendant();
    this.configureAutoComplete_crew1();
    this.configureAutoComplete_crew2();
    this.configureAutoComplete_crew3();
    this.configureAutoComplete_crew4();
    this.configureAutoComplete_crew5();
    this.configureAutoComplete_crew6();

    this._getFlightTime();
    this._getBlkTime();

    

    // this.formGroup.get('customer')?.setValue({cid: 7, code: "AR07", names: "MUKTAR"})

    this._route.data.subscribe((d) => {
      console.log(d);
      if (d.flightdata !== 0) {
        // edit mode
        console.log('edit mode');
        this.isNew = true;
        this.nameReadonly = true;
        this.patchCustomer(d.flightdata.data.flightLog.name);
        this.patchRegistration(d.flightdata.data.flightLog.flightreg);
        this.patchNumber(d.flightdata.data.flightLog.orderno);
        this.loadCrewArray(d.flightdata.data.flightLogDetail);
        this.formGroup.patchValue({qno: d.flightdata.data.flightLog.qno});
        this.formGroup.patchValue({date: new Date(d.flightdata.data.flightLog.tdate)});
        this.formGroup.patchValue({nextCheckDate: new Date(d.flightdata.data.flightLog.checkdate)});        
        this.formGroup.patchValue({preflightDone: !!d.flightdata.data.flightLog.cpreflight});
        this.formGroup.patchValue({cmdtAcceptance: !!d.flightdata.data.flightLog.ccmdt});
        this.formGroup.patchValue({nonCommercial: !!d.flightdata.data.flightLog.ccommercial});
        this.formGroup.patchValue({deferDefect: !!d.flightdata.data.flightLog.defect});
        this.formGroup.patchValue({hasDelay: !!d.flightdata.data.flightLog.hasdelay});

        this.formGroup.patchValue({delayBy: d.flightdata.data.flightLog.delayby});
        this.formGroup.patchValue({delayAirport: d.flightdata.data.flightLog.airport});
        this.formGroup.patchValue({deOrCx: d.flightdata.data.flightLog.decx});
        this.formGroup.patchValue({delayReason: d.flightdata.data.flightLog.delayreason});
        this.formGroup.patchValue({delayTime: d.flightdata.data.flightLog.delaytime});
        this.formGroup.patchValue({delayCorrectiveAction: d.flightdata.data.flightLog.correctiveaction});
        this.formGroup.patchValue({engine1: d.flightdata.data.flightLog.engine1});
        this.formGroup.patchValue({engine2: d.flightdata.data.flightLog.engine2});
        this.formGroup.patchValue({oilengine1: d.flightdata.data.flightLog.oilengine1});
        this.formGroup.patchValue({oilengine2: d.flightdata.data.flightLog.oilengine2});
        this.formGroup.patchValue({propserial1: d.flightdata.data.flightLog.propserial1});
        this.formGroup.patchValue({propserial2: d.flightdata.data.flightLog.propserial2});



        this.totalBlkTime = d.flightdata.data.flightLog.totalflighttime;
        this.totalFlightTime = d.flightdata.data.flightLog.totalairtime;
      } else console.log('normal mode');
    });
  }

  displayCustomerName = (customer: any): string =>
    customer && customer.names ? customer.names : '';
  displayRegistratonName = (registration: any): string =>
    registration && registration.ainfo ? registration.ainfo : '';
  displayCrewLeg = (crew: any): string =>
    crew && crew.nmroute ? crew.nmroute : '';
  displayStaff = (staff: any): string =>
    staff && staff.names ? staff.names : '';

  configureAutoComplete_customer() {
    const customerInputValuechanges$ =
      this.formGroup.controls.customer.valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value.names))
      );

    this.filteredCustomerOptions = combineLatest([
      customerInputValuechanges$,
      this.customers$,
    ]).pipe(
      // tap(([v,c]) => console.log(v,c)),
      map(([value, customers]) => {
        if (!value) return customers;
        return customers.filter((c: any) =>
          c.names.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }

  configureAutoComplete_registration() {
    const registrationInputValuechanges$ =
      this.formGroup.controls.registration.valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value.ainfo))
      );

    this.filteredRegistrationOptions = combineLatest([
      registrationInputValuechanges$,
      this.registrations$,
    ]).pipe(
      // tap(([v,c]) => console.log(v,c)),
      map(([value, regs]) => {
        if (!value) return regs;
        return regs.filter((r: any) =>
          r.ainfo.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }

  configureAutoComplete_crewLeg() {
    const crewFormGroup = this.formGroup.controls.crew as FormGroup;
    const crewLegInputValuechanges$ =
      crewFormGroup.controls.crewLeg.valueChanges.pipe(
        startWith(''),
        map((value) => {
          if (value === null) return '';
          return typeof value === 'string' ? value : value.nmroute;
        }),
        tap((_) => {
          const crewLeg = this.formGroup.get('crew')?.get('crewLeg')?.value;
          if (crewLeg) {
            this.formGroup.get('crew')?.get('crewFrom')?.setValue(crewLeg.rfrm);
            this.formGroup.get('crew')?.get('crewTo')?.setValue(crewLeg.rto);
          }
        })
      );

    this.filteredCrewLegOptions = combineLatest([
      crewLegInputValuechanges$,
      this.crewLegs$,
    ]).pipe(
      // tap(([v,c]) => console.log(v,c)),
      map(([value, cl]) => {
        if (!value) return cl;
        return cl.filter((r: any) =>
          r.nmroute.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }

  configureAutoComplete_pilot() {
    const crewFormGroup = this.formGroup.controls.crew as FormGroup;
    this.filteredPilots = crewFormGroup.controls.pilot.valueChanges.pipe(
      startWith(''),
      map((value) => {
        if (value === null) return '';
        return typeof value === 'string' ? value : value.names;
      }),
      map((name) => (name ? this._filterPilot(name) : this.pilots.slice()))
    );
  }

  _filterPilot(name: string) {
    const filterValue = name.toLowerCase();
    return this.pilots.filter((p) =>
      p.names.toLowerCase().includes(filterValue)
    );
  }

  configureAutoComplete_officer() {
    const crewFormGroup = this.formGroup.controls.crew as FormGroup;
    this.filteredOfficers = crewFormGroup.controls.officer.valueChanges.pipe(
      startWith(''),
      map((value) => {
        if (value === null) return '';
        return typeof value === 'string' ? value : value.names;
      }),
      map((name) => (name ? this._filterOfficer(name) : this.officers.slice()))
    );
  }

  _filterOfficer(name: string) {
    const filterValue = name.toLowerCase();
    return this.officers.filter((p) =>
      p.names.toLowerCase().includes(filterValue)
    );
  }

  configureAutoComplete_attendant() {
    const crewFormGroup = this.formGroup.controls.crew as FormGroup;
    this.filteredAttendants =
      crewFormGroup.controls.attendant.valueChanges.pipe(
        startWith(''),
        map((value) => {
          if (value === null) return '';
          return typeof value === 'string' ? value : value.nmroute;
        }),
        map((name) =>
          name ? this._filterOfficer(name) : this.attendants.slice()
        )
      );
  }

  _filterAttendants(name: string) {
    const filterValue = name.toLowerCase();
    return this.attendants.filter((p) =>
      p.names.toLowerCase().includes(filterValue)
    );
  }

  configureAutoComplete_crew1() {
    const crewFormGroup = this.formGroup.controls.crew as FormGroup;
    this.filteredCrew1 = crewFormGroup.controls.crew1.valueChanges.pipe(
      startWith(''),
      map((value) => {
        if (value === null) return '';
        return typeof value === 'string' ? value : value.names;
      }),
      map((name) => (name ? this._filterCrew(name) : this.crews.slice()))
    );
  }
  configureAutoComplete_crew2() {
    const crewFormGroup = this.formGroup.controls.crew as FormGroup;
    this.filteredCrew2 = crewFormGroup.controls.crew2.valueChanges.pipe(
      startWith(''),
      map((value) => {
        if (value === null) return '';
        return typeof value === 'string' ? value : value.names;
      }),
      map((name) => (name ? this._filterCrew(name) : this.crews.slice()))
    );
  }
  configureAutoComplete_crew3() {
    const crewFormGroup = this.formGroup.controls.crew as FormGroup;
    this.filteredCrew3 = crewFormGroup.controls.crew3.valueChanges.pipe(
      startWith(''),
      map((value) => {
        if (value === null) return '';
        return typeof value === 'string' ? value : value.names;
      }),
      map((name) => (name ? this._filterCrew(name) : this.crews.slice()))
    );
  }
  configureAutoComplete_crew4() {
    const crewFormGroup = this.formGroup.controls.crew as FormGroup;
    this.filteredCrew4 = crewFormGroup.controls.crew4.valueChanges.pipe(
      startWith(''),
      map((value) => {
        if (value === null) return '';
        return typeof value === 'string' ? value : value.names;
      }),
      map((name) => (name ? this._filterCrew(name) : this.crews.slice()))
    );
  }
  configureAutoComplete_crew5() {
    const crewFormGroup = this.formGroup.controls.crew as FormGroup;
    this.filteredCrew5 = crewFormGroup.controls.crew5.valueChanges.pipe(
      startWith(''),
      map((value) => {
        if (value === null) return '';
        return typeof value === 'string' ? value : value.names;
      }),
      map((name) => (name ? this._filterCrew(name) : this.crews.slice()))
    );
  }
  configureAutoComplete_crew6() {
    const crewFormGroup = this.formGroup.controls.crew as FormGroup;
    this.filteredCrew6 = crewFormGroup.controls.crew6.valueChanges.pipe(
      startWith(''),
      map((value) => {
        if (value === null) return '';
        return typeof value === 'string' ? value : value.names;
      }),
      map((name) => (name ? this._filterCrew(name) : this.crews.slice()))
    );
  }

  _filterCrew(name: string) {
    const filterValue = name.toLowerCase();
    return this.crews.filter((p) =>
      p.names.toLowerCase().includes(filterValue)
    );
  }

  addToCrewArray() {
    this.formGroup.markAsTouched();
    console.log(this.formGroup.get('crew')?.value);
    

    if (this.formGroup.valid) {

      if(this.selectedCrew && this.selectedCrew.id) {
        const newObj = {
           ...this.selectedCrew, ...this.formGroup.get('crew')?.value
         }
         this.crewList.splice(this.selectedCrew.id - 1, 1, newObj);
         this.totalBlkTime += (+this.formGroup.get('crew')?.value.blkTime - +this.selectedCrew.blkTime);
         this.totalFlightTime += (+this.formGroup.get('crew')?.value.fltTime - +this.selectedCrew.fltTime);
         this.patchCrewToNull();
         this.selectedCrew = null;
       } else {
   
         this.crewList.push({
           ...this.formGroup.get('crew')?.value,
           id: this.crewList.length + 1,
           fdid: 0
         });
         this.totalBlkTime += +this.formGroup.get('crew')?.value.blkTime;
         this.totalFlightTime += +this.formGroup.get('crew')?.value.fltTime;
         this.patchCrewToNull();
         this.selectedCrew = null;
       }

       

      // const c = this.formGroup.controls.crew as FormGroup;
      // c.reset();
      // Object.keys(c.controls).forEach(key => {
      //   c.get(key)?.setErrors(null) ;
      // });
    }
  }

  deleteFromCrewArray() {
    if (this.selectedCrew && this.selectedCrew.id) {
      this.crewList.splice(this.selectedCrew.id - 1, 1);

      this.totalBlkTime -= +this.selectedCrew.blkTime;
      this.totalFlightTime -= +this.selectedCrew.fltTime;

      this.patchCrewToNull();
      this.selectedCrew = null;
    }
    
  }
  selectedCrew!: any;
  loadRowtoCrewForm(crew: any) {
    this.selectedCrew = crew;
    this.formGroup.get('crew')?.patchValue({
      ...crew
    });
  }

  patchCrewToNull() {
    this.formGroup.get('crew')?.patchValue({
      crewLeg: null,
      cksOff: null,
      takeOff: null,
      landing: null,
      cksOn: null,
      fltTime: null,
      blkTime: null,
      paxNo: null,
      landingWeight: 0,
      baggage: 0,
      cargo: 0,
      takeOffWeight: 0,
      fuelUplift: 0,
      fuelOnboard: 0,
      crewFrom: null,
      crewTo: null,
      splitDutyFrom: null,
      splitDutyTo: null,
      flightNo: null,
      rcptOrAdrNo: null,
      supplier: null,
      // Crew
      pilot: null,
      officer: null,
      attendant: null,
      crew1: null,
      crew2: null,
      crew3: null,
      crew4: null,
      crew5: null,
      crew6: null,
    });
  }

  patchCustomer(name: string) {
    this.customers$.subscribe((customer: any) => {
      const c = customer.filter((x: any) => x.names === name);
      // console.log(c);
      this.formGroup.patchValue({ customer: c[0] });
    });
  }

  patchRegistration(name: string) {
    this.registrations$.subscribe((regs: any) => {
      const r = regs.filter((x: any) => x.ainfo === name);
      this.formGroup.patchValue({ registration: r[0] });
    });
  }

  patchNumber(num: string) {
    this.formGroup.patchValue({ number: num });
  }

  

  loadCrewArray(crewArr: any[]) {
    crewArr.forEach((curr: any, ind) => {
      var currentCrewLeg;
      this.crewLegs$.subscribe((cl: any[]) => {
       currentCrewLeg = cl.filter((c:any) => c.nmroute === curr.route);         
      });

      this.crewList.push({
        crewLeg: this._getCrewLeg(curr.route),
        route: curr.route,
        cksOff: curr.out_time, 
        takeOff: curr.up_time,
        landing: curr.down_time,
        cksOn: curr.in_time,
        fltTime: curr.air_time,
        blkTime: curr.flt_time,
        paxNo: curr.passno,
        landingWeight: curr.weight_,
        fuelUplift: curr.fuel_uplift,
        fuelOnboard: curr.fuelonboard,
        cargo: curr.bag_cargo,
        takeOffWeight: curr.takeoffw,
        splitDutyFrom: curr.offdutyfrom,
        splitDutyTo: curr.offdutyto,
        crewFrom: curr.lfrom,
        crewTo: curr.lto,
        id: ind + 1,
        flightNo: curr.flightno,
        baggage: curr.bag,
        rcptOrAdrNo: curr.rctno,
        supplier: [curr.supplierno],
        pilot: this._getPilot(curr.captain),
        officer: this._getOfficer(curr.officer),
        attendant: this._getAttendant(curr.attendant),
        crew1: this._getCrew(curr.crew1),
        crew2: this._getCrew(curr.crew2),
        crew3: this._getCrew(curr.crew3),
        crew4: this._getCrew(curr.crew4),
        crew5: this._getCrew(curr.crew5),
        crew6: this._getCrew(curr.crew6),
        fdid: curr.fdid,
      });
    });
  }


  private _getCrewLeg(route:string) {
    let currentCrewLeg:any[] = [];
      this.crewLegs$.subscribe((cl: any[]) => {
       currentCrewLeg = cl.filter((c:any) => c.nmroute === route);         
      });
    if(currentCrewLeg.length > 0)
      return currentCrewLeg[0];
    return '';
  }


  private _getPilot(name:string) {
    const currentPilot = this.pilots.filter(p => p.code === name);
    if(currentPilot.length > 0)
      return currentPilot[0];
    return '';
  }

  private _getOfficer(name:string) {
    const currentOfficer = this.officers.filter(p => p.code === name);
    if(currentOfficer.length > 0)
      return currentOfficer[0];
    return '';
  }

  private _getAttendant(name:string) {
    const currentAttendant = this.attendants.filter(p => p.code === name);
    if(currentAttendant.length > 0)
      return currentAttendant[0];
    return '';
  }

  private _getCrew(name: string) {
    const currentCrew = this.crews.filter(p => p.code === name);
    if(currentCrew.length > 0)
      return currentCrew[0];
    return '';
  }

  private _getFlightTime() {
    const crewFormGroup = this.formGroup.get('crew') as FormGroup;
    const takeOff$ = crewFormGroup.controls['takeOff'].valueChanges;
    const landing$ = crewFormGroup.controls['landing'].valueChanges;

    combineLatest([landing$,takeOff$]).subscribe(([l,t]) => {
      // console.log(l, t);
      if(!l || !t ){
         crewFormGroup.patchValue({'fltTime': null})
      } else{
        const takeOff = moment.duration(t);
        const landing = moment.duration(l);
        const diff = landing.subtract(takeOff)

        if(diff.minutes() >= 0 && diff.hours() >= 0){
          const min = diff.asMinutes();
          const x = (min /60 ).toFixed(2)
          // console.log(x.padStart(5,'0').replace('.',':'));
          crewFormGroup.patchValue({'fltTime': x.padStart(5,'0')})
        } else {
          crewFormGroup.patchValue({'fltTime': null})
        }
      }
    })

  }


  private _getBlkTime() {
    const crewFormGroup = this.formGroup.get('crew') as FormGroup;
    const cksOff$ = crewFormGroup.controls['cksOff'].valueChanges;
    const cksOn$ = crewFormGroup.controls['cksOn'].valueChanges;

    combineLatest([cksOn$,cksOff$]).subscribe(([ckOn,ckOff]) => {
      // console.log(ckOn, ckOff);
      if(!ckOn || !ckOff){
         crewFormGroup.patchValue({'blkTime': null})
      } else{
        const cksOff = moment.duration(ckOff);
        const cksOn = moment.duration(ckOn);
        const diff = cksOn.subtract(cksOff)
        // console.log(diff)
        if(diff.minutes() >= 0 && diff.hours() >= 0){
          const min = diff.asMinutes();
          // console.log(min);
          const x = min / 60;
          // console.log(x.padStart(5,'0').replace('.',':'));
          crewFormGroup.patchValue({'blkTime': x.toFixed(2).padStart(5,'0')})
        } else {
          crewFormGroup.patchValue({'blkTime': null})
        }
      }
    })
  }


  onSave() {
    const crewData = this.crewList.map((curr) => {
      return {
        "orderno": this.formGroup.value.number,
        "route": curr.crewLeg.nmroute,
        "out_time": curr.cksOff,
        "up_time": curr.takeOff,
        "down_time": curr.landing,
        "in_time": curr.cksOn,
        "air_time": +curr.fltTime,
        "flt_time": +curr.blkTime,
        "passno": +curr.paxNo,
        "weight_": +curr.landingWeight,
        "fuel_uplift": curr.fuelUplift,
        "fuelonboard": curr.fuelOnboard,
        "bag_cargo": +curr.cargo,
        "takeoffw": +curr.takeOffWeight,
        "fdid": curr.fdid,
        "offdutyfrom": curr.splitDutyFrom,
        "offdutyto": curr.splitDutyTo,
        "lfrom": curr.crewFrom,
        "lto": curr.crewTo,
        "rctno": curr.rcptOrAdrNo,
        "supplierno": curr.supplier.toString(),
        "flightno": curr.flightNo,
        "captain": curr.pilot?.code,
        "officer": curr.officer?.code,
        "attendant": curr.attendant?.code,
        "crew1": curr.crew1?.code,
        "crew2": curr.crew2?.code,
        "crew3": curr.crew3?.code,
        "crew4": curr.crew4?.code,
        "crew5": curr.crew5?.code,
        "crew6": curr.crew6?.code,
        "bag": +curr.baggage,
        "leg": null,
        "etd": null,
        "eflt_time": null,
        "int_officer": null,
        "int_captain": null,
        "day_": null,
        "gh": null,
        "if_sim": null,
        "if_act": null,
        "navex": null,
        "tptsp": null,
        "duty": null,
        "night_nh": null,
        "night_nvg": null,
      }
    })
    const postData = {
      flightLog: {
        "orderno": this.formGroup.value.number,
        "flightreg": this.formGroup.value.registration.ainfo,
        "name": this.formGroup.value.customer.names,
        "code": this.formGroup.value.customer.code,
        "tdate": this.formGroup.value.date.toISOString(),
        "predatedate": this.formGroup.value.date.toISOString(),
        "cmdtdate":  this.formGroup.value.date.toISOString(),
        "checkdate":  this.formGroup.value.nextCheckDate.toISOString(),
        "defect": +this.formGroup.value.deferDefect,
        "captain": null,
        "officer": null,
        "attendant": null,
        "totalairtime": this.totalFlightTime,
        "totalflighttime": this.totalBlkTime,
        "totaldutytime": 0.0,
        "posted": 0,
        "staff": null,
        "staffdate": "0001-01-01T00:00:00",
        "fid": 0,
        "bulk": null,
        "rct": null,
        "supplier": null,
        "remarks": this.formGroup.value.remarks,
        "crew1": null,
        "crew2": null,
        "crew3": null,
        "crew4": null,
        "crew5": null,
        "crew6": null,
        "qno": this.formGroup.value.qno,
        "cpreflight": +this.formGroup.value.preflightDone,
        "ccmdt":  +this.formGroup.value.cmdtAcceptance,
        "sroute": null,
        "invoiced_hrs": 0.0,
        "ccommercial": +this.formGroup.value.nonCommercial,
        "old_code": null,
        "hasdelay": +this.formGroup.value.hasDelay,
        "delayby": this.formGroup.value.delayBy,
        "airport": this.formGroup.value.delayAirport,
        "decx": this.formGroup.value.deOrCx,
        "delayreason": this.formGroup.value.delayReason,
        "delaytime": +this.formGroup.value.delayTime,
        "correctiveaction": this.formGroup.value.delayCorrectiveAction,
        "engine1": this.formGroup.value.engine1,
        "oilengine1": +this.formGroup.value.oilengine1,
        "propserial1": this.formGroup.value.propserial1,
        "engine2": this.formGroup.value.engine2,
        "oilengine2": +this.formGroup.value.oilengine2,
        "propserial2": this.formGroup.value.propserial2,
        "flightnoh": null,
        "cnew": this.isNew ? 0 : 1
      },
      flightLogDetails: [...crewData]
    }


    console.dir(postData);

    console.log(JSON.stringify(postData))

    this._flightListService.postFlightLogOperations(postData)
    .subscribe(d => {
      console.log(d)
      alert(d.data)
      // this._snackBar.open(d.data);
    }, err => {
      console.log(err)
      alert(err.message)
    });



  }
}
