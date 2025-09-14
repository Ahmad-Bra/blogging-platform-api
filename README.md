blogging platform
Sample solution for the blogging platform challenge from roadmap.sh.

This is wep app api for blogging platform.

project url: https://roadmap.sh/projects/blogging-platform-api

Features
Add new blog with a unique ID and store it in database
Update blog
Delete blog by ID.

Prerequisites
Node.js installed on your system.
Installation
Clone the Repository

git clone --depth=1 https://github.com/Ahmad-Bra/blogging-platform-api

# Navigate to the project Directory
cd  to yor project path


# Add a blog in this format in this prefix /api/blogs
{
        "description": "description",
        "title": "title",
},

# update a blog by id in this prefix /api/blogs/id
{
        "description": "updated description",
        "title": "upadted title",
},

# delete a blog by it id in this prefix /api/blogs/id

# to get single blog in this prefix /api/blogs/id

# To search for a blog use this prefix /api/blogs?term=


 
