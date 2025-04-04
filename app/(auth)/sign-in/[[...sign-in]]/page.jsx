import { SignIn } from '@clerk/nextjs'
import Head from 'next/head';

export default function Page() {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
        padding: '20px',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
      };
    
      const cardStyle = {
        background: '#fff',
        padding: '10px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '950px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'transform 0.3s ease-in-out',
        position: 'relative',
      };
    
      const headingStyle = {
        marginBottom: '15px',
        color: '#333',
        fontSize: '28px',
        fontWeight: 'bold',
        textAlign: 'center',
      };
    
      const subHeadingStyle = {
        marginBottom: '20px',
        color: '#555',
        fontSize: '16px',
        textAlign: 'center',
      };
    
      const buttonStyle = {
        background: '#6a11cb',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
        width: '100%',
        marginTop: '15px',
      };
    
      const imageStyle = {
        width: '100%',
        maxWidth: '250px',
        marginBottom: '20px',
      };
    
      return (
        <>
          <Head>
            <title>Mock Interview Agent - Sign In</title>
          </Head>
          <div style={containerStyle}>
            <div style={cardStyle}>
              <img
                src="https://imgs.search.brave.com/i5IQfh_7DushjPWW1Ha6EKx3om8Ugu6f1_Hi3s1WbQQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMx/MjEyMDQ3My92ZWN0/b3IvaW50ZXJ2aWV3/LWNvbmNlcHQtcHJv/ZmVzc2lvbmFsLWpv/Yi1pbnRlcnZpZXct/YnVzaW5lc3MtcGVv/cGxlLXdvcmstbWFu/LWJ1c2luZXNzbWFu/LWRlc2lnbi5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9RWpX/LUtFa2RBd0NpX2kz/OTNkQnJXQWtScGoy/alhFQUtOVDdCTWRq/SVhEaz0"
                alt="Interview Illustration"
                style={imageStyle}
              />
              <h2 style={headingStyle}>Welcome to Mock Interview Agent!</h2>
              <p style={subHeadingStyle}>Prepare for your interviews with confidence.</p>
              <SignIn routing="path" path="/sign-in" />
            </div>
          </div>
        </>
      );
    }