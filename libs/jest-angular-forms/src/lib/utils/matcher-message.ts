import MatcherContext = jest.MatcherContext;

interface MatcherResult {
  pass: boolean;
  message: () => string;
}

interface MatcherMessageOptions {
  matcher: string;
  pass: boolean;
  expected?: unknown;
  received?: unknown;
  positiveMessage: string;
  negativeMessage: string;
}

export function matcherMessage(
  context: MatcherContext,
  options: MatcherMessageOptions,
): jest.CustomMatcherResult {
  const {
    matcher,
    pass,
    expected,
    received,
    positiveMessage,
    negativeMessage,
  } = options;

  return {
    pass,
    message: () => {
      const lines = [
        context.utils.matcherHint(matcher, 'received', 'expected', {
          isNot: context.isNot,
          promise: context.promise,
        }),
        '',
        pass ? negativeMessage : positiveMessage,
      ];

      if (expected !== undefined) {
        lines.push(`Expected: ${context.utils.printExpected(expected)}`);
      }

      if (received !== undefined) {
        lines.push(`Received: ${context.utils.printReceived(received)}`);
      }

      return lines.join('\n');
    },
  };
}
