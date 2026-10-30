import { DOCUMENT } from '@angular/common';
import { Component, inject, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-docs-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly isPortuguese = inject(LOCALE_ID).startsWith('pt');
  private readonly baseHref =
    inject(DOCUMENT).querySelector('base')?.getAttribute('href') ?? '/';
  readonly englishUrl = this.isPortuguese
    ? this.baseHref.replace(/pt\/?$/, '')
    : this.baseHref;
  readonly portugueseUrl = `${this.englishUrl}pt/`;
}
