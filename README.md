# 🏠 Property Checker — React Client-Side Web Application

A **client-side property search and display application** inspired by [Rightmove.co.uk](https://www.rightmove.co.uk/), built using **React** and **Vite**.  
This project enables users to search, filter, and view properties based on multiple criteria, view detailed property pages, and manage a list of favourite properties — **all without any server-side processing**.

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Core Features](#core-features)
3. [Technical Stack](#technical-stack)
4. [Project Structure](#project-structure)
5. [Data](#data)
6. [Search Functionality](#search-functionality)
7. [Favourites System](#favourites-system)
8. [Responsive Design](#responsive-design)
9. [Aesthetic & UI Principles](#aesthetic--ui-principles)
10. [Security Measures](#security-measures)
11. [Testing](#testing)
12. [Installation & Setup](#installation--setup)
13. [Deployment](#deployment)
14. [Version Control & GitHub](#version-control--github)
15. [Future Improvements](#future-improvements)
16. [Author](#author)

---

## 🧠 Project Overview

**Objective:**  
To create a **fully client-side property listing web app** that allows users to:
- Search properties based on multiple filters
- View detailed property information
- Manage a list of favourite properties
- Experience a responsive and visually cohesive interface  
- Interact with the site entirely in the browser (no backend or database)

This project demonstrates the use of **React UI components, state management, and lifecycle hooks**, along with modern **frontend security**, **responsiveness**, and **testing practices**.

---

## ⚙️ Core Features

| Feature | Description | Marks |
|----------|--------------|------|
| **JSON Property Data** | Includes 7 diverse property objects in a local JSON file. | 4% |
| **Search Form** | Search by type, price range, bedroom range, date added, and postcode area using React components. | 10% |
| **React UI Widgets** | Enhanced form with date pickers, dropdowns, sliders, and accessible components. | 8% |
| **Results Display** | Grid-based responsive results layout with images and brief property details. | 7% |
| **Property Detail Page** | Large image, image gallery, and tabbed interface for info, floorplan, and Google Maps. | 12% |
| **Favourites Management** | Add/remove properties from favourites via drag-and-drop or buttons. | 15% |
| **Responsive Design** | Two layouts (desktop and tablet/mobile) with Flexbox/Grid + media queries. | 8% |
| **Aesthetics & UI Design** | Visually consistent typography, grouping, and balance. | 4% |
| **Security** | HTML encoding, CSP, and client-side protection. | 3% |
| **Testing (Jest)** | Minimum of five functional/unit tests. | 12% |
| **Code Quality** | Well-structured, readable, and commented code. | 4% |
| **Version Control** | Incremental commits with clear history. | 5% |
| **Deployment** | Hosted live on GitHub Pages or similar. | 5% |

---

## 🧰 Technical Stack

- **Frontend Framework:** React (via Vite)
- **Language:** JavaScript (ES6+)
- **Styling:** CSS3 (Flexbox & Grid), with media queries
- **UI Enhancements:** React Widgets (React Datepicker, Select, Range Input)
- **Routing:** React Router
- **State Management:** React useState & useContext hooks
- **Testing:** Jest + React Testing Library
- **Deployment:** GitHub Pages
- **Version Control:** Git & GitHub

---

## 🗂️ Project Structure

```
property-checker/
│
├── public/               # Static files (favicon, images)
├── src/
│   ├── assets/           # Property images
│   ├── components/       # Reusable UI components (Form, Card, Tabs, etc.)
│   ├── data/             # JSON data (properties.json)
│   ├── pages/            # Page components (SearchPage, PropertyPage)
│   ├── context/          # Favourites context provider
│   ├── tests/            # Jest test files
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

---

## 🧾 Data

The application uses a local JSON file (`src/data/properties.json`) containing **7 property entries**, each with the following structure:

```json
{
    "id": "prop1",
    "type": "House",
    "bedrooms": 3,
    "price": 750000,
    "tenure": "Freehold",
    "description": "Long Description",
    "location": "Petts Wood Road, Petts Wood, Orpington BR5",
    "picture": "images/prop1pic1small.jpg",
    "url": "properties/prop1.html",
    "added": {
        "month": "October",
        "day": 12,
        "year": 2022
    }
}
```

---

## 🔍 Search Functionality

Users can search by one or multiple criteria:
- Property Type: house, flat, or any  
- Price Range: min and max values  
- Bedrooms: min and max values  
- Date Added: after or between specific dates  
- Postcode Area: e.g., BR1, NW1  

Filtering logic runs **client-side**, matching multiple simultaneous criteria.  
If no criteria are selected, all properties are displayed.

---

## 💾 Favourites System

Users can manage their favourites list via:
- **Drag & Drop** → drag a property card into the favourites panel  
- **Click Button** → click a heart/favourite icon on a property  

Favourites can be:
- Viewed on the Search page sidebar  
- Removed by dragging out or clicking delete  
- Cleared entirely via a “Clear All” button  

Each property can only appear **once** in the favourites list.

---

## 📱 Responsive Design

Two main responsive layouts:
1. **Large screens (desktop)** — two-column layout (search form + results)
2. **Small screens (< 1024px)** — stacked layout for compact view  

Techniques used:
- **CSS Grid & Flexbox**
- **Media Queries**
- **Fluid typography & spacing**
- **Accessible, touch-friendly buttons and forms**

---

## 🎨 Aesthetic & UI Principles

This project follows modern **UI/UX best practices**, including:
- Clear **grouping** of related form elements
- Visual hierarchy via **headings, font size, and weight**
- Consistent **font family and color scheme**
- Alignment ensuring visual flow
- Focus indicators for accessibility
- Use of property **images and icons** for engagement
- Harmony and balance across all views

---

## 🔒 Security Measures

Implemented client-side protection includes:
- **Content Security Policy (CSP)** in `<meta>` headers
- **HTML encoding** of user inputs and outputs
- **React’s built-in XSS protection**
- **No inline scripts or eval()**
- Sanitized rendering of dynamic content

---

## 🧪 Testing

Testing framework: **Jest + React Testing Library**

Minimum 5 meaningful tests covering:
1. Rendering of search form and components  
2. Filtering logic based on multiple criteria  
3. Adding/removing favourites  
4. Property detail tab switching  
5. Responsive layout rendering

Run tests using:
```bash
npm test
```

---

## 🧩 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jolenjolen/property-checker.git
   cd property-checker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open in your browser:  
   [http://localhost:5173](http://localhost:5173)

---

## 🌐 Deployment

The project is deployed on **Vercel**:  
👉 [Live Demo URL](https://property-checker.vercel.app/)

To deploy manually:
```bash
npm run build
npm run deploy
```

---

## 🔁 Version Control & GitHub

- Each feature developed in a separate branch
- Frequent, descriptive commits (e.g., `feat: add search filter component`)
- Merged to `main` via pull requests
- Tagged final version: `v1.0.0`

---

## 🚀 Future Improvements

- Integrate a backend API for dynamic property loading  
- Add user authentication for persistent favourites  
- Advanced filters (property features, furnishing, etc.)  
- Animations and transitions for smoother UX  
- Unit tests for drag-and-drop interaction  

---

## 👤 Author

**Name:** Jolen Mascarenhas <br> 
**Student ID:** W2078969 <br> 
**Course:** Web Development / Frontend Engineering  
**GitHub:** [https://github.com/jolenjolen](https://github.com/jolenjolen)

