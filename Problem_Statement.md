# Problem Statement

## 1. Title

Creator Marketplace for Hiring Video Editors & Designers

## 2. Domain

Creative Services Marketplace

## 3. Who is the user?

### Client

A client is a person or organization who needs creative services such as video editing or graphic designing. The client can register, log in, post projects, browse creators, view creator portfolios, send hiring requests, track projects, and provide reviews.

### Creator

A creator is a video editor or designer who provides creative services. The creator can register, log in, create a professional profile, add skills and portfolio items, browse available projects, receive hiring requests, and manage accepted projects.

### Admin

The administrator manages users, projects, hiring requests, and platform activities to maintain the proper functioning of the marketplace.

## 4. What problem are we solving?

Clients who require video editing or design services may find it difficult to identify suitable creators based on their skills, experience, portfolio, and pricing. At the same time, video editors and designers may face difficulty in presenting their work and finding relevant project opportunities.

The proposed system provides a structured marketplace where clients can discover suitable creators and creators can find relevant projects. It also provides a centralized workflow for hiring requests, project tracking, and reviews.

## 5. Proposed Solution

The proposed system is a web-based creator marketplace that connects clients with video editors and designers.

The application will provide:

* User registration and login with role-based access.
* Creator profile creation with skills, experience, and pricing information.
* Portfolio management for creators.
* Project posting for clients.
* Creator search and project browsing.
* Hiring request management.
* Project status tracking.
* Reviews and ratings after project completion.
* Admin management of users and platform activities.

## 6. Core Entities / Database Tables

The core database tables are:

1. Users
2. Creator Profiles
3. Portfolios
4. Projects
5. Hiring Requests
6. Reviews

These entities will have relationships to represent users, creators, projects, hiring activities, and reviews.

## 7. User Roles & Permissions

### Client

* Register and log in.
* Create and manage projects.
* Browse creator profiles and portfolios.
* Send hiring requests.
* Track project status.
* Submit reviews and ratings.

### Creator

* Register and log in.
* Create and manage creator profile.
* Add and manage portfolio items.
* Browse available projects.
* Accept or reject hiring requests.
* Update project status.
* View received reviews.

### Admin

* Log in to the administration area.
* Manage users.
* Monitor projects and hiring requests.
* Manage platform activities.

## 8. Success Criteria

The project will be considered successful when:

* Users can register and log in securely.
* Different user roles receive appropriate access and permissions.
* Creators can create profiles and manage portfolio information.
* Clients can create and manage projects.
* Creators can browse available projects.
* Clients can send hiring requests to creators.
* Project and hiring information is stored and retrieved from the database successfully.
* Clients can provide ratings and reviews after project completion.

## 9. Out of Scope

The following features are outside the initial project scope:

* Real-money payment processing.
* Built-in video editing functionality.
* Real-time video calling.
* Development of a separate mobile application.
* Advanced social-media functionality.

## 10. Chosen Track

Java Track — React.js frontend, Spring Boot backend, Spring Security with JWT authentication, Spring Data JPA/Hibernate, and MySQL database.
