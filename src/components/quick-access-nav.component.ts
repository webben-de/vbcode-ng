import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { SVB_APP_ROUTES } from '../app/ROUTES';

export type NavCardSize = 'small' | 'medium' | 'large';

interface NavCard {
  route: string[];
  icon: string;
  titleKey?: string;
  title?: string;
  descriptionKey?: string;
  description?: string;
  color: 'blue' | 'indigo' | 'purple' | 'green' | 'pink' | 'orange' | 'red';
}

@Component({
  selector: 'app-quick-access-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, TranslocoModule],
  template: `
    <div [ngClass]="getGridClasses()">
      @for (card of cards; track card.route[0]) {
      <a [routerLink]="card.route" class="group">
        <mat-card [ngClass]="getCardClasses()">
          <mat-icon [ngClass]="getIconClasses(card.color)">{{ card.icon }}</mat-icon>
          <h3 [ngClass]="getTitleClasses(card.color)">
            @if (card.titleKey) {
            {{ card.titleKey | transloco }}
            } @else {
            {{ card.title }}
            }
          </h3>
          @if (size !== 'small' && (card.description || card.descriptionKey)) {
          <p [ngClass]="getDescriptionClasses()">
            @if (card.descriptionKey) {
            {{ card.descriptionKey | transloco }}
            } @else {
            {{ card.description }}
            }
          </p>
          }
        </mat-card>
      </a>
      }
    </div>
  `,
})
export class QuickAccessNavComponent {
  @Input() size: NavCardSize = 'medium';
  @Input() columns = 4;
  @Input() cards: NavCard[] = [];

  ROUTES = SVB_APP_ROUTES;

  getGridClasses(): string {
    const baseClasses = 'grid gap-3 md:gap-4';
    const colClasses: Record<number, string> = {
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-2 md:grid-cols-4',
      5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
      6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    };
    return `${baseClasses} ${colClasses[this.columns] || 'grid-cols-2 md:grid-cols-4'}`;
  }

  getCardClasses(): string {
    const baseClasses = 'text-center hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105';
    const sizeClasses: Record<NavCardSize, string> = {
      small: '!p-3 md:!p-4',
      medium: '!p-4 md:!p-6',
      large: '!p-6 md:!p-8',
    };
    return `${baseClasses} ${sizeClasses[this.size]}`;
  }

  getIconClasses(color: string): string {
    const baseClasses = 'transition-colors';
    const sizeClasses: Record<NavCardSize, string> = {
      small: '!text-3xl md:!text-4xl !w-10 md:!w-12 !h-10 md:!h-12 mb-1 md:mb-2',
      medium: '!text-4xl md:!text-5xl !w-12 md:!w-14 !h-12 md:!h-14 mb-2 md:mb-3',
      large: '!text-5xl md:!text-6xl !w-14 md:!w-16 !h-14 md:!h-16 mb-3 md:mb-4',
    };
    const colorClasses: Record<string, string> = {
      blue: 'text-blue-600 group-hover:text-blue-700',
      indigo: 'text-indigo-600 group-hover:text-indigo-700',
      purple: 'text-purple-600 group-hover:text-purple-700',
      green: 'text-green-600 group-hover:text-green-700',
      pink: 'text-pink-600 group-hover:text-pink-700',
      orange: 'text-orange-600 group-hover:text-orange-700',
      red: 'text-red-600 group-hover:text-red-700',
    };
    return `${baseClasses} ${sizeClasses[this.size]} ${colorClasses[color] || colorClasses['blue']}`;
  }

  getTitleClasses(color: string): string {
    const baseClasses = 'font-semibold text-gray-900 transition-colors';
    const sizeClasses: Record<NavCardSize, string> = {
      small: 'text-xs md:text-sm',
      medium: 'text-sm md:text-lg',
      large: 'text-lg md:text-xl',
    };
    const hoverColorClasses: Record<string, string> = {
      blue: 'group-hover:text-blue-600',
      indigo: 'group-hover:text-indigo-600',
      purple: 'group-hover:text-purple-600',
      green: 'group-hover:text-green-600',
      pink: 'group-hover:text-pink-600',
      orange: 'group-hover:text-orange-600',
      red: 'group-hover:text-red-600',
    };
    return `${baseClasses} ${sizeClasses[this.size]} ${hoverColorClasses[color] || hoverColorClasses['blue']}`;
  }

  getDescriptionClasses(): string {
    const baseClasses = 'text-gray-500';
    const sizeClasses: Record<NavCardSize, string> = {
      small: 'text-xs mt-1',
      medium: 'text-sm mt-2',
      large: 'text-base mt-2',
    };
    return `${baseClasses} ${sizeClasses[this.size]}`;
  }
}

// Helper function to create standard nav cards
export function createNavCards(): NavCard[] {
  return [
    {
      route: [SVB_APP_ROUTES.root, SVB_APP_ROUTES.teams],
      icon: 'groups',
      title: 'Teams',
      description: 'Verwalte deine Teams',
      color: 'blue',
    },
    {
      route: [SVB_APP_ROUTES.root, SVB_APP_ROUTES.games],
      icon: 'event',
      title: 'Spiele',
      description: 'Alle Events im Überblick',
      color: 'indigo',
    },
    {
      route: [SVB_APP_ROUTES.root, SVB_APP_ROUTES.gameDataEntry],
      icon: 'input',
      titleKey: 'game-data-entry',
      descriptionKey: 'enter-game-data-desc',
      color: 'purple',
    },
    {
      route: [SVB_APP_ROUTES.root, SVB_APP_ROUTES.trainingDataEntry],
      icon: 'fitness_center',
      titleKey: 'training-data-entry',
      descriptionKey: 'enter-training-data-desc',
      color: 'green',
    },
    {
      route: [SVB_APP_ROUTES.root, SVB_APP_ROUTES.report],
      icon: 'assessment',
      title: 'Reports',
      description: 'Auswertungen ansehen',
      color: 'pink',
    },
  ];
}

// Helper function for user dashboard
export function createUserNavCards(): NavCard[] {
  return [
    {
      route: [SVB_APP_ROUTES.root, SVB_APP_ROUTES.teams],
      icon: 'groups',
      title: 'Meine Teams',
      color: 'blue',
    },
    {
      route: [SVB_APP_ROUTES.root, SVB_APP_ROUTES.games],
      icon: 'event',
      title: 'Spiele',
      color: 'indigo',
    },
    {
      route: [SVB_APP_ROUTES.root, SVB_APP_ROUTES.gameDataEntry],
      icon: 'input',
      titleKey: 'game-data-entry',
      descriptionKey: 'enter-game-data-desc',
      color: 'purple',
    },
    {
      route: [SVB_APP_ROUTES.root, SVB_APP_ROUTES.trainingDataEntry],
      icon: 'fitness_center',
      titleKey: 'training-data-entry',
      descriptionKey: 'enter-training-data-desc',
      color: 'green',
    },
    {
      route: [SVB_APP_ROUTES.root, SVB_APP_ROUTES.playerProgress],
      icon: 'trending_up',
      titleKey: 'player-progress',
      color: 'green',
    },
    {
      route: [SVB_APP_ROUTES.root, SVB_APP_ROUTES.report],
      icon: 'assessment',
      title: 'Reports',
      color: 'pink',
    },
  ];
}
