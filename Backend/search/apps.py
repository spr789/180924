from django.apps import AppConfig

class SearchConfig(AppConfig):
    name = 'search'

    def ready(self):
        import search.signals  # Import the signals file to register the signals
