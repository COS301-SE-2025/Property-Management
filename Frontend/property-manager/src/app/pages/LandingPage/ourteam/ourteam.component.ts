import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

@Component({
  selector: 'app-ourteam',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ourteam.component.html',
  styleUrls: ['./ourteam.component.scss']
})
export class OurteamComponent {
  teamMembers: TeamMember[] = [
    {
      name: 'Khomotjo Maluleke',
      role: 'Data Engineer & System Architect',
      image: 'assets/images/team/khomotjo.jpg',
      linkedin: 'https://www.linkedin.com/in/khomotjo-maluleke-4181a929b/'
    },
    {
        name: 'Sean Maritz',
        role: 'Project Manager & UI Engineer',
        image: 'assets/images/team/Sean.jpg',
        linkedin: 'https://www.linkedin.com/in/sean-maritz-6b247535b/'
    },
    {
        name: 'Thabiso Mncube',
        role: 'System Designer & UI Engineer',
        image: 'assets/images/team/Thabiso.jpg',
        linkedin: 'https://www.linkedin.com/in/thabiso-mncube-81679b327/'
    },
    {
        name: 'Karabelo Taole',
        role: 'Service Engineer & Data Engineer',
        image: 'assets/images/team/Karabelo.jpg',
        linkedin: 'https://www.linkedin.com/in/karabelo-taole-70480322a/'
    },
    {
        name: 'Tafara Hwata',
        role: 'Service Engineer & Data Engineer',
        image: 'assets/images/team/Tafara.png',
        linkedin: 'https://www.linkedin.com/in/tafara-hwata-5b6b9824b/'
    }
  ];
}
