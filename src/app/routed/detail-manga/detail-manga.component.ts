import { Component, Injectable, Input } from '@angular/core';
import { Manga_Dex } from '../../../services/manga.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-detail-manga',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './detail-manga.component.html',
  styleUrl: './detail-manga.component.scss'
})
export class DetailMangaComponent {
  @Input() manga: Manga_Dex = {
    id: '1044287a-73df-48d0-b0b2-5327f32dd651',
    defaultTitle: "JoJo's Bizarre Adventure, Part 7: Steel Ball Run (Official Colored)",
    germanTitle: [],
    originalTitle: [
      "JoJo no Kimyou na Bouken: Steel Ball Run",
      "JoJo no Kimyou na Bouken Part 7: Steel Ball Run",
      "ジョジョの奇妙な冒険 第7部 カラー版"
    ],
    currentCover: "https://uploads.mangadex.org/covers/1044287a-73df-48d0-b0b2-5327f32dd651/e7e5e267-502f-4b77-9f19-b7ea1344f68f.jpg",
    description: "In the American Old West, the world's greatest race is about to begin. Thousands line up in San Diego to travel over six thousand kilometers for a chance to win the grand prize of fifty million dollars. With the era of the horse reaching its end, contestants are allowed to use any kind of vehicle they wish. Competitors will have to endure grueling conditions, traveling up to a hundred kilometers a day through uncharted wastelands. The Steel Ball Run is truly a one-of-a-kind event.  The youthful Johnny Joestar, a crippled former horse racer, has come to San Diego to watch the start of the race. There he encounters Gyro Zeppeli, a racer with two steel balls at his waist instead of a gun. Johnny witnesses Gyro using one of his steel balls to unleash a fantastical power, compelling a man to fire his gun at himself during a duel. In the midst of the action, Johnny happens to touch the steel ball and feels a power surging through his legs, allowing him to stand up for the first time in two years. Vowing to find the secret of the steel balls, Johnny decides to compete in the race, and so begins his bizarre adventure across America on the Steel Ball Run.",
    contentRating: "suggestive",
    tags: [
      "Award Winning",
      "Official Colored",
      "Historical",
      "Action",
      "Psychological",
      "Comedy",
      "Martial Arts",
      "Adventure",
      "Sexual Violence",
      "Gore",
      "Drama",
      "Horror",
      "Fantasy",
      "Supernatural",
      "Mystery",
      "Tragedy"
    ],
    ratingAverage: 9.6162,
    releaseDate: "2012",
    authors: [
      "Araki Hirohiko"
    ],
    artists: [
      "Araki Hirohiko"
    ],
    publicationStatus: "ongoing",
    followers: 55742,
    commentCount: 158,
    demographic: "",
    originalLanguage: "ja",
    lastVolume: 0,
    lastChapter: 95,
    ratingBayesian: 9.605691153759626,
    availableTranslatedLanguages: []
  };
}
