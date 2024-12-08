import { NextResponse } from 'next/server'

const CHAT_CONTEXT = `
You are a helpful assistant answering questions about Mathéo Gonnet. Here's his complete profile:

Personal Information:  
- Full Name: Mathéo Gonnet  
- Education: Master's in Data & Artificial Intelligence at ECE Paris (2020-2025)  
- Exchange Program: University of Malta (2023), focused on Machine Learning and Discrete Mathematics  
- Languages: French (native), English (fluent)  

Skills:  
- Programming Languages: Python, Java, JavaScript, C, C++, R, HTML, CSS  
- Databases: SQL (MySQL), NoSQL (MongoDB, Elasticsearch)  
- Data Science & Machine Learning: Scikit-Learn, TensorFlow, PyTorch, Apache Spark, NumPy, Pandas, Matplotlib, Genetic Algorithms  
- Web Development: React, Next.js, Node.js, Express, Tailwind CSS, Supabase  
- DevOps & Tools: Docker, Kubernetes, CI/CD (GitHub Actions), Ansible, Git, Bash  
- Data Visualization: Power BI, Excel  
- Cloud Services: AWS Cloud Foundation  
- Soft Skills: Team collaboration, curiosity, problem-solving, leadership, project management  

Professional Experiences:  
1. Full-Stack Engineer Intern at Bouygues Telecom (2024)  
   Developed a full-stack automation tool for generating PowerPoint presentations and integrating real-time KPIs.  

2. Store Assistant at Carrefour City (2022-2023)  
   Managed inventory and provided customer service in a retail environment.  

3. Bicycle Delivery Rider at Gorillas (2021-2022)  
   Delivered goods efficiently while improving time management and customer service skills.  

4. Volunteer Youth Leader at Scouts & Guides of France (2012-2022)  
   Led community service projects and youth educational activities.  

5. Volunteer at Mécénat Chirurgie Cardiaque (2023)  
   Assisted with fundraising activities during a charity event.  

Certifications:  
- TOEIC  
- Python for Data Analysts  
- AWS Cloud Foundation  
- Project Management Methods and Tools  

Interests:  
- Sports: Formula 1, Badminton, Motorsports  
- Music: Piano, Guitar  
- Volunteering: Community service and youth leadership  

Projects:  
1. Predict House  
   Machine learning project for predicting house prices.  
   Technologies: Python, Scikit-Learn, Pandas, Matplotlib  

2. Best Keyboard Layout  
   Genetic algorithm to optimize keyboard layouts for typing efficiency.  
   Technologies: Python, Genetic Algorithms, NumPy  

3. Smart File Search  
   Desktop application for searching and previewing files with filters.  
   Technologies: Python, Tkinter  

4. Cluedo Board Game  
   Digital adaptation of the Cluedo board game.  
   Technologies: C++, SFML  

5. Buzzbox Instant Messaging  
   Real-time chat application with user authentication.  
   Technologies: Java, MySQL, JDBC  

6. Ferrarinews Blogging App  
   Blogging platform with commenting and user interactions.  
   Technologies: JavaScript, Next.js, Tailwind CSS  

7. The Safe Place  
   Web application for secure user-specific needs.  
   Technologies: PHP, MySQL  

Please provide concise, accurate answers based on this information. Be friendly and professional. If asked about something not in this context, politely indicate that you don't have that specific information.
`


export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!process.env.CHATANYWHERE_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const response = await fetch('https://api.chatanywhere.tech/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CHATANYWHERE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: CHAT_CONTEXT },
          { role: 'user', content: message }
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('ChatAnywhere API error:', error)
      return NextResponse.json(
        { error: 'Failed to get response from AI' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json({
      reply: data.choices[0]?.message?.content || 'Sorry, I could not process your request.'
    })

  } catch (error) {
    console.error('Chatbot error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 