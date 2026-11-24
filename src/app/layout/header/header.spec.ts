import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import {provideRouter} from '@angular/router';

describe('Header', () => {
  let compiled: HTMLElement;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should display the ÖRDER logo title', () => {
    expect(compiled.querySelector('.logo-title')?.textContent).toContain('ÖRDER');
  });

  it('should contain navigation links to items, customers and basket', () => {
    const links = Array.from(document.querySelectorAll('nav a')).map((a) => a.getAttribute('href'));
    expect(links).toEqual(['/items', '/customers', '/basket']);
  })
});
