import React from 'react'
import './Syntax.css'
export const Syntax = (props) => {
  return (
    <div className='root'>
        <h1>Welcome to Kang learn the syntax !...</h1>
        <div className="section">
            <h2>Variable Declaration</h2>
            <p><strong>Keyword:</strong> <code>vibe</code></p>
            <p><strong>Usage:</strong> Declare a variable and assign a value.</p>
            <div className="syntax">
                <pre>vibe &lt;variable_name&gt; = &lt;value&gt;</pre>
            </div>
            <p><strong>Example:</strong></p>
            <div className="syntax">
                <pre>vibe age = 21</pre>
            </div>
        </div>

        {/* <!-- Print Statement --> */}
        <div className="section">
            <h2>Print Statement</h2>
            <p><strong>Keyword:</strong> <code>shout</code></p>
            <p><strong>Usage:</strong> Print a message or variable to the console.</p>
            <div className="syntax">
                <pre>shout &lt;message or variable&gt;</pre>
            </div>
            <p><strong>Example:</strong></p>
            <div className="syntax">
                <pre>shout "Hello, World!"</pre>
                <pre>shout age</pre>
            </div>
        </div>

        {/* <!-- Conditional Statement --> */}
        <div className="section">
            <h2>Conditional Statement</h2>
            <p><strong>Keyword:</strong> <code>fr</code> (for "if")</p>
            <p><strong>Usage:</strong> Execute a block of code if a condition is true.</p>
            <div className="syntax">
                <pre>fr &lt;condition&gt; {<pre>
                <pre>&nbsp;&nbsp;&nbsp;&nbsp;&lt;code_block&gt;</pre>
                </pre>}</pre>
            </div>
            <p><strong>Example:</strong></p>
            <div className="syntax">
                <pre>fr age same 21 {<pre>
                <pre>&nbsp;&nbsp;&nbsp;&nbsp;shout "You're 21!"</pre>
                </pre>}</pre>
            </div>
        </div>

        {/* // <!-- Loops --> */}
        <div className="section">
            <h2>Loops</h2>

            {/* <!-- Fixed Iteration Loop --> */}
            <h3>Fixed Iteration Loop</h3>
            <p><strong>Keyword:</strong> <code>grind</code></p>
            <p><strong>Usage:</strong> Execute a block of code for a fixed number of times.</p>
            <div className="syntax">
                <pre>grind &lt;iterations&gt; {<pre>
                <pre>&nbsp;&nbsp;&nbsp;&nbsp;&lt;code_block&gt;</pre>
                </pre>}</pre>
            </div>
            <p><strong>Example:</strong></p>
            <div className="syntax">
                <pre>grind 5 {<pre>
                <pre>&nbsp;&nbsp;&nbsp;&nbsp;shout "Looping..."</pre>
                </pre>}</pre>
            </div>

            {/* // <!-- Conditional Loop --> */}
            <h3>4.2 Conditional Loop</h3>
            <p><strong>Keyword:</strong> <code>keep vibing</code></p>
            <p><strong>Usage:</strong> Continue looping while a condition is true.</p>
            <div className="syntax">
                <pre>keep vibing &lt;condition&gt; {<pre>
                <pre>&nbsp;&nbsp;&nbsp;&nbsp;&lt;code_block&gt;</pre>
                </pre>}</pre>
            </div>
            <p><strong>Example:</strong></p>
            <div className="syntax">
                <pre>keep vibing age high 18 {<pre>
                <pre>&nbsp;&nbsp;&nbsp;&nbsp;shout "Still vibing..."</pre>
                </pre>}</pre>
            </div>
        </div>

        {/* // <!-- Arithmetic Operations --> */}
        <div className="section">
            <h2>5. Arithmetic Operations</h2>
            <p><strong>Keywords:</strong> <code>add</code>, <code>sub</code>, <code>mul</code>, <code>div</code></p>
            <p><strong>Usage:</strong> Perform arithmetic operations and store the result in a variable.</p>
            <div className="syntax">
                <pre>&lt;operation&gt; &lt;target_variable&gt; &lt;operand1&gt; &lt;operand2&gt;</pre>
            </div>
            <p><strong>Example:</strong></p>
            <div className="syntax">
                <pre>add result 5 10</pre>
                <pre>sub result 10 5</pre>
                <pre>mul result 2 3</pre>
                <pre>div result 10 2</pre>
            </div>
        </div>

        {/* // <!-- Custom Keywords --> */}
        <div className="section">
            <h2>6. Custom Keywords</h2>
            <p><strong>Keyword:</strong> <code>customize</code></p>
            <p><strong>Usage:</strong> Define your own keywords.</p>
            <div className="syntax">
                <pre>customize &lt;new_keyword&gt; as &lt;existing_keyword&gt;</pre>
            </div>
            <p><strong>Example:</strong></p>
            <div className="syntax">
                <pre>customize loop as grind</pre>
                <pre>loop 3 {<pre>
                <pre>&nbsp;&nbsp;&nbsp;&nbsp;shout "Custom loop!"</pre>
                </pre>}</pre>
            </div>
        </div>

        {/* // <!-- Operators --> */}
        <div className="section">
            <h2>Operators</h2>
            <h3>Comparison Operators</h3>
            <table border="1" cellPadding="10">
            <thead>
                <tr>
                <th>Operator</th>
                <th>Meaning</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td><code>same</code></td>
                <td>Equal to</td>
                </tr>
                <tr>
                <td><code>high</code></td>
                <td>Greater than</td>
                </tr>
                <tr>
                <td><code>low</code></td>
                <td>Less than</td>
                </tr>
            </tbody>
            </table>

        </div>
        {/* // <!-- Example Code Block --> */}
        <div className="section">
            <h2>Code Block Example</h2>
            <div className="syntax">
                <pre>vibe count = 0</pre>
                <pre>grind 5 {<pre>
                <pre>&nbsp;&nbsp;&nbsp;&nbsp;shout "Looping..."</pre>
                <pre>&nbsp;&nbsp;&nbsp;&nbsp;add count count 1</pre>
                </pre>}</pre>
                <pre>fr count same 5 {<pre>
                <pre>&nbsp;&nbsp;&nbsp;&nbsp;shout "Count reached 5!"</pre>
                </pre>}</pre>
                <pre>keep vibing count high 0 {<pre>
                <pre>&nbsp;&nbsp;&nbsp;&nbsp;shout "Decrementing count..."</pre>
                <pre>&nbsp;&nbsp;&nbsp;&nbsp;sub count count 1</pre>
                </pre>}</pre>
            </div>
        </div>
    </div>
  )
}
