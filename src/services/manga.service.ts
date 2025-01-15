import { Injectable } from '@angular/core';
import { CsvService } from './csv.service';


@Injectable({
  providedIn: 'root'
})
export class MangaService {
    
}

export class Manga {
  
    private id: string ;
    private title_de: string;
    private cover_url: string;

    constructor(id: string, title_de: string, cover_url: string) {
        this.id = id;
        this.title_de = title_de;
        this.cover_url = cover_url;
    }

    public get getId(): string {
        return this.id;
    }

    public get getTitle_de(): string {
        return this.title_de;
    }

    public get getCover_url(): string {
        return this.cover_url;
    }

    public set setId(id: string) {
        this.id = id;
    }

    public set setTitle_de(title_de: string) {
        this.title_de = title_de;
    }

    public set setCover_url(cover_url: string) {
        this.cover_url = cover_url;
    }
}