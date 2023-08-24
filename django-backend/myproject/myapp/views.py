from django.http import JsonResponse
from rest_framework.decorators import api_view
from nltk.util import ngrams
from nltk import word_tokenize

@api_view(['GET'])
def compare_ngrams(request):
    try:
        recent_strings = []  
        if len(recent_strings) >= 2:
            tokens1 = word_tokenize(recent_strings[-2])
            tokens2 = word_tokenize(recent_strings[-1])
            n = 2  
            ngrams1 = list(ngrams(tokens1, n))
            ngrams2 = list(ngrams(tokens2, n))

            common_ngrams = list(set(ngrams1) & set(ngrams2))
            response_data = {
                'common_ngrams': common_ngrams
            }
            return JsonResponse(response_data)
        else:
            return JsonResponse({'message': 'Insufficient recent strings'}, status=400)
    except Exception as e:
        return JsonResponse({'message': 'Error processing request'}, status=500)





