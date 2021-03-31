class Prompt {
    constructor() {
        this.featurePrompt = {
            name: 'features',
            message: 'Check the features needed for your project:',
            type: 'checkbox',
            choices: [],
        }
        this.injectedPrompts = []
    }

    getAllPrompts() {
        return [
            this.featurePrompt,
            ...this.injectedPrompts,
        ]
    }

    injectFeature(feature) {
        this.featurePrompt.choices.push(feature)
    }

    injectPrompt(prompt) {
        this.injectedPrompts.push(prompt)
    }
}

module.exports = Prompt;