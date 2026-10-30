import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HeaderComponent } from '../header/header.component';
import { OverviewComponent } from '../overview/overview.component';
import { SetupComponent } from '../setup/setup.component';
import { ExamplesComponent } from '../examples/examples.component';
import { MatchersComponent } from '../matchers/matchers.component';
import { NotesComponent } from '../notes/notes.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-docs-page',
  imports: [
    HeaderComponent,
    OverviewComponent,
    SetupComponent,
    ExamplesComponent,
    MatchersComponent,
    NotesComponent,
    FooterComponent,
  ],
  templateUrl: './docs-page.component.html',
  styleUrl: './docs-page.component.css',
})
export class DocsPageComponent implements AfterViewInit {
  @ViewChild('translatedTitle', { static: true })
  private titleElement!: ElementRef<HTMLElement>;
  @ViewChild('translatedDescription', { static: true })
  private descriptionElement!: ElementRef<HTMLElement>;
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  ngAfterViewInit(): void {
    // Read the localized template so the HTML is the single source for page copy.
    this.title.setTitle(
      this.titleElement.nativeElement.textContent?.trim() ?? '',
    );
    this.meta.updateTag({
      name: 'description',
      content: this.descriptionElement.nativeElement.textContent?.trim() ?? '',
    });
  }
}
