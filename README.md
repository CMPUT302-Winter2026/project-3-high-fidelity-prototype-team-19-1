# Prototype Description — Vocabulary Explorer (Milestone 5)

## 1. Overview
This document describes the Milestone 5 prototype for **Vocabulary Explorer**, a medium- to high-fidelity React prototype for CMPUT 302 Project 3. The prototype supports the main learner, teacher, and expert-oriented flows from the project brief:
- searching for Cree and English vocabulary
- browsing vocabulary by category
- exploring semantic relationships between words
- saving words into custom study or lesson topics
- identifying a semantic gap example when there is no direct one-to-one translation

The prototype is intended to be closer to the high-fidelity end of the spectrum than our Milestone 4 prototype. It includes a polished mobile layout, realistic screen-to-screen navigation, improved feedback, and interaction flows updated using the results from our Milestone 4B evaluation with people.

## 2. What the prototype includes
The Milestone 5 prototype includes the following implemented screens and flows:
- **Home** page with search and topic cards
- **Search** page with autocomplete suggestions, direct results, and a no-direct-translation state
- **Topic** pages with interactive semantic network browsing and progressive disclosure
- **Categories** page with category search and node previews
- **Related Words** page focused on exploration of nearby words
- **Details** page with meaning, pronunciation, grammar, examples, and direct saving to topics
- **Saved Topics** page with search, topic creation, topic viewing, and word removal
- **Contextual Help** available from every screen
- **Centered success feedback** after saving actions

## 3. How to use the prototype
### Running locally
1. Install dependencies with `npm install`
2. Start the prototype with `npm run dev`
3. Open the local Vite URL shown in the terminal

### Core task flows
- **Search for a word:** Use the search bar on the Home or Search page.
- **Browse a category:** Open the Categories tab or use a topic card on Home.
- **Explore relationships:** Open a word and select **Related Words**.
- **Save a word:** Open a word’s **Details** page and choose **Save to Topic**.
- **Manage saved topics:** Open the **Saved** tab to search, create, open, or delete topics.
- **View a semantic gap example:** Search for **elephant** or open the elephant example from Animals.

## 4. Changes made based on the most recent evaluation
Our Milestone 4B evaluation showed that the main usability problem was the **save-topic workflow**. All six participants completed all five tasks, but Task 4 (“Save a custom topic”) had the lowest average ease score at **4.5**, while the other tasks scored **6.3 to 6.8**. Participants consistently reported that they did not know whether saving started from **Related Words** or **Details**, and several participants found the old **Select / Unselect** workflow unintuitive.

Based on those results, we made the following design changes in Milestone 5.

### 4.1 Saved Topics page improvements
**Problem from M4B:** Participants wanted clearer topic management and one participant specifically suggested adding a category section in the navigation.

**Change in M5:**
- Added a search bar to the Saved Topics page
- Added a clear **Create Topic** button on the Saved Topics page
- Allowed creation of empty topics before adding words
- Improved the view/remove flow inside saved topics

**Why:** This makes topic management more visible and easier to start.

### 4.2 Related Words page redesign
**Problem from M4B:** Participants said the Related Words page was trying to do too much at once. One participant explicitly said related words should be separated from saving.

**Change in M5:**
- Removed the bulk save mechanism from Related Words
- Removed **Select / Unselect** on that page
- Kept the page focused on exploration only
- Added a cleaner list-based related-word layout with direct Details access

**Why:** This reduces confusion by separating exploration from saving.

### 4.3 Details page as the single save entry point
**Problem from M4B:** Users were unsure whether saving should start from Related Words or Details. Another participant specifically said the save action should be in the word details section.

**Change in M5:**
- Added a direct **Save to Topic** button on Details
- Added a modal that supports two actions:
  - add the current word to an existing topic
  - create a new topic and save the word to it
- Added clear centered success feedback after saving

**Why:** This creates one clear, predictable save workflow.

### 4.4 New Categories page in the navigation
**Problem from M4B:** One participant suggested adding a category section to the nav bar so it is easier to navigate.

**Change in M5:**
- Added a dedicated **Categories** tab to the bottom navigation
- Added a category search bar
- Added preview nodes for each topic

**Why:** This makes category browsing more explicit and supports first-time users better.

### 4.5 Semantic gap example
**Problem from earlier milestones:** The no-direct-translation / semantic-gap flow had not been properly represented in the prototype.

**Change in M5:**
- Added **elephant** as a semantic-gap example
- Added semantic-gap messaging to Search
- Added an elephant node example inside Animals that routes into the no-direct-translation flow

**Why:** This better supports the expert use case and aligns the prototype with the original project brief.

### 4.6 Additional polish changes
We also implemented smaller improvements based on observed confusion and comments:
- stronger visual prominence for **Details** buttons
- hover and press feedback on buttons
- simpler wording in help content
- clearer checkmark feedback after saving

## 5. What is stubbed or simplified
This is still a prototype, so some parts are intentionally simplified:
- The vocabulary dataset is mocked and limited to a subset of topics and words.
- Audio buttons provide feedback but do not yet play final recorded pronunciation.
- The semantic-gap example is representative rather than a full linguistic model.
- Some advanced expert data remains simplified to keep the interface understandable for novice users.

## 6. Why this prototype is near high fidelity
Compared with the Milestone 4 version, this prototype is closer to high fidelity because it includes:
- more polished visual styling
- more complete navigation structure
- stronger interaction feedback
- refined task flows based directly on user evaluation results
- realistic saving and topic-management interactions instead of placeholder behavior

## 7. Repository and execution notes
The prototype is implemented as a React + Vite application. The repository includes:
- source code in `src/`
- installation instructions in `README.md`
- a Vite base path configured for the team GitHub Classroom repository

## 8. Summary
The Milestone 5 prototype updates the Milestone 4 prototype using direct evidence from our evaluation with people. The biggest change is the redesigned save flow: saving now starts from Details, Related Words is focused only on exploration, Saved Topics has clearer management tools, Categories now has its own navigation tab, and the prototype finally includes a semantic-gap example.
