import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Kanginter {
    private static final Map<String, Object> variables = new HashMap<>();
    private static final Map<String, String> customKeywords = new HashMap<>();

    public static void main(String[] args) {
        try {
            File file = new File("code.txt");
            Scanner scanner = new Scanner(file);

            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                if (line.equalsIgnoreCase("exit")) {
                    System.out.println("Later, fam! 👋");
                    break;
                }

                try {
                    execute(line);
                } catch (Exception e) {
                    System.out.println("Error: " + e.getMessage());
                }
            }
            scanner.close();
        } catch (FileNotFoundException e) {
            System.out.println("Error: File not found.");
            e.printStackTrace();
        }
    }

    private static void execute(String line) throws Exception {
        if (line.startsWith("customize")) {
            handleCustomization(line);
            return;
        }
        for (Map.Entry<String, String> entry : customKeywords.entrySet()) {
            line = line.replaceAll("\\b" + entry.getKey() + "\\b", entry.getValue());
        }
        if (line.matches("^(add|sub|mul|div|rem).*")) {
            handleOperation(line);
        } else if (line.startsWith("vibe")) {
            handleVariableDeclaration(line);
        } else if (line.startsWith("shout")) {
            handlePrint(line);
        } else if (line.startsWith("fr")) {
            handleIf(line);
        } else if (line.startsWith("grind")) {
            handleFixedLoop(line);
        } else if (line.startsWith("keep vibing")) {
            handleConditionalLoop(line);
        } else if (line.contains("=")) {
            handleAssignment(line);
        } else {
            throw new Exception("Bruh, unknown command: " + line);
        }

    }

    private static void handleOperation(String line) throws Exception {
        String op = line.substring(0, 3).trim();
        String exp = line.substring(3).trim();
        String[] operands = exp.split(" ");
        if (operands.length == 3) {
            int target = (int) parseValue(operands[0]);
            int op1 = (int) parseValue(operands[1]);
            int op2 = (int) parseValue(operands[2]);
            if (op.equals("add"))
                target = op1 + op2;
            else if (op.equals("sub"))
                target = op1 - op2;
            else if (op.equals("mul"))
                target = op1 * op2;
            else if (op.equals("div"))
                target = op1 / op2;
            else if (op.equals("rem"))
                target = op1 % op2;
            else
                throw new Exception("undefined operation " + op);
            variables.put(operands[0], target);
        } else {
            throw new Exception("Invalid operation syntax. Expected: add x 5 10");
        }
    }

    private static void handleCustomization(String line) throws Exception {
        line = line.substring(9).trim();
        String[] parts = line.split(" ");
        if (parts.length != 3 || !parts[1].equals("as")) {
            throw new Exception(
                    "Bruh, invalid customization syntax. Use: 'customize <newKeyword> as <defaultKeyword>'");
        }

        String newKeyword = parts[0].trim();
        String defaultKeyword = parts[2].trim();

        if (!defaultKeyword.matches("vibe|shout|fr|add|sub|mul|div=")) {
            throw new Exception("Invalid default keyword: " + defaultKeyword);
        }

        customKeywords.put(newKeyword, defaultKeyword);
        System.out.println("Keyword '" + newKeyword + "' set to '" + defaultKeyword + "'.");
    }

    private static void handleVariableDeclaration(String line) throws Exception {
        String[] parts = line.split("=");
        if (parts.length != 2) {
            throw new Exception("Bruh, invalid vibe syntax.");
        }
        String varName = parts[0].replace("vibe", "").trim();
        String value = parts[1].trim();
        variables.put(varName, parseValue(value));
    }

    private static void handlePrint(String line) {
        String content = line.substring(6).trim();
        if (variables.containsKey(content)) {
            System.out.println(variables.get(content));
        } else if (content.startsWith("\"") && content.endsWith("\"")) {
            System.out.println(content.substring(1, content.length() - 1));
        } else {
            System.out.println(content);
        }
    }

    private static void handleAssignment(String line) throws Exception {
        String[] parts = line.split("=");
        if (parts.length != 2) {
            throw new Exception("Bruh, invalid assignment.");
        }
        String varName = parts[0].trim();
        String value = parts[1].trim();

        if (!variables.containsKey(varName)) {
            throw new Exception("Who dat? Variable " + varName + " not defined.");
        }
        variables.put(varName, parseValue(value));
    }

    private static void handleIf(String line) throws Exception {
        String conditionPart = line.substring(2, line.indexOf("{")).trim();
        String[] condition = conditionPart.split(" ");
        if (condition.length != 3) {
            throw new Exception("Bruh, invalid condition syntax.");
        }

        Object left = parseValue(condition[0]);
        String operator = condition[1];
        Object right = parseValue(condition[2]);

        if (!(left instanceof Integer && right instanceof Integer)) {
            throw new Exception("Conditions only support integers, fam.");
        }

        boolean conditionMet = evaluateCondition((int) left, operator, (int) right);

        if (conditionMet) {
            String action = line.substring(line.indexOf("{") + 1, line.indexOf("}")).trim();
            execute(action);
        }
    }

    private static boolean evaluateCondition(int left, String operator, int right) {
        return switch (operator) {
            case "same" -> left == right;
            case "sus" -> left != right;
            case "high" -> left > right;
            case "low" -> left < right;
            default -> throw new RuntimeException("Bruh, invalid operator.");
        };
    }

    private static Object parseValue(String value) throws Exception {
        if (value.matches("-?\\d+")) {
            return Integer.parseInt(value);
        } else if (variables.containsKey(value)) {
            return variables.get(value);
        } else if (value.startsWith("\"") && value.endsWith("\"")) {
            return value.substring(1, value.length() - 1);
        } else {
            throw new Exception("Bruh, invalid value: " + value);
        }
    }

    private static void handleFixedLoop(String line) throws Exception {
        String[] parts = new String[2];
        parts[0] = line.substring(0, line.indexOf("{"));
        parts[1] = line.substring(line.indexOf("{") + 1);
        if (parts.length != 2 || !parts[1].endsWith("}")) {
            throw new Exception("Bruh, invalid grind syntax.");
        }
        String iterationsPart = parts[0].replace("grind", "").trim();
        int iterations = evaluateExpression(iterationsPart);
        String block = parts[1].substring(0, parts[1].length() - 1).trim();
        String[] statements = block.split(";");
        for (int i = 0; i < iterations; i++) {
            for (String statement : statements) {
                execute(statement.trim());
            }
        }
    }

    private static void handleConditionalLoop(String line) throws Exception {
        String[] parts = line.split("\\{");
        if (parts.length != 2 || !parts[1].endsWith("}")) {
            throw new Exception("Bruh, invalid keep vibing syntax.");
        }
        String conditionPart = line.substring("keep vibing".length(), line.indexOf("{")).trim();
        String[] condition = conditionPart.split(" ");
        if (condition.length != 3) {
            throw new Exception("Invalid condition syntax for keep vibing.");
        }
        String block = parts[1].substring(0, parts[1].length() - 1).trim();
        String[] statements = block.split(";");
        while (evaluateCondition(
                evaluateExpression(condition[0]),
                condition[1],
                evaluateExpression(condition[2]))) {
            for (String statement : statements) {
                execute(statement.trim());
            }
        }
    }

    private static int evaluateExpression(String expression) throws Exception {
        expression = expression.trim();
        if (expression.matches("-?\\d+")) {
            return Integer.parseInt(expression);
        }
        if (variables.containsKey(expression)) {
            if (variables.get(expression) instanceof Integer)
                return (Integer) variables.get(expression);
            else {
                System.out.println("Bruh !,The given Data Type value cannont be used in loop");
            }
        }
        for (String operator : new String[] { "+", "-", "*", "/" }) {
            if (expression.contains(operator)) {
                String[] parts = expression.split("\\" + operator);
                int left = evaluateExpression(parts[0].trim());
                int right = evaluateExpression(parts[1].trim());

                switch (operator) {
                    case "+":
                        return left + right;
                    case "-":
                        return left - right;
                    case "*":
                        return left * right;
                    case "/":
                        if (right == 0) {
                            throw new ArithmeticException("Cannot divide by zero.");
                        }
                        return left / right;
                }
            }
        }
        throw new Exception("Invalid expression: " + expression);
    }

}
