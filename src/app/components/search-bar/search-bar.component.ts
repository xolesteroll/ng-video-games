import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  public searchForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  public onSubmit() {
    this.router.navigate(['search', this.searchForm.get('search')?.value])
    console.log(this.searchForm.get('search')?.value)
  }
}
